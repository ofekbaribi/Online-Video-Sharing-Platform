#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <string.h>
#include <thread>  // For multithreading
#include <signal.h> // For signal handling
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <vector>
#include <sstream>

using namespace std;

volatile sig_atomic_t server_running = 1;

// MongoDB instance
mongocxx::instance instance{};
// MongoDB client
mongocxx::client client(mongocxx::uri("mongodb://localhost:27017"));
// Access the database
mongocxx::database db = client["view_tube_db"];
// Access or create the 'userWatchHistory' collection
mongocxx::collection collection = db["userWatchHistory"];

// Signal handler for graceful shutdown
void handle_signal(int signal) {
    if (signal == SIGINT) {
        server_running = 0;
    }
}

// Function to update the user's watch history in MongoDB
void updateUserWatchHistory(const std::string& username, int videoId) {
    bsoncxx::builder::stream::document filter{};
    filter << "username" << username;

    // Find the user in the collection
    auto userDoc = collection.find_one(filter.view());

    if (userDoc) {
        // If the user exists, update the videoIds list
        bsoncxx::builder::stream::document update_doc{};
        update_doc << "$addToSet" << bsoncxx::builder::stream::open_document
                   << "videoIds" << videoId << bsoncxx::builder::stream::close_document;

        collection.update_one(filter.view(), update_doc.view());
        cout << "Updated watch history for user: " << username << endl;
    } else {
        // If the user doesn't exist, create a new document
        bsoncxx::builder::stream::document new_user{};
        new_user << "username" << username
                 << "videoIds" << bsoncxx::builder::stream::open_array << videoId
                 << bsoncxx::builder::stream::close_array;

        collection.insert_one(new_user.view());
        cout << "Inserted new watch history for user: " << username << endl;
    }
}

// Function to handle communication with the client
void handle_client(int client_sock) {
    char buffer[4096] = {0};  // Initialize buffer to zero

    // Receive data from the client
    int read_bytes = recv(client_sock, buffer, sizeof(buffer), 0);
    if (read_bytes == 0) {
        cout << "Client disconnected" << endl;
    } else if (read_bytes < 0) {
        perror("Error receiving data");
    } else {
        // buffer contains the video id and the username in the format "username,videoId"
        cout << "Received from client: " << buffer << endl;

        // Parse the received data to extract username and videoId
        std::string received_data(buffer);
        std::stringstream ss(received_data);
        std::string username;
        std::string videoIdStr;
        getline(ss, username, ',');  // Extract username
        getline(ss, videoIdStr);     // Extract video ID

        int videoId = stoi(videoIdStr);  // Convert video ID to integer

        // Update the user's watch history in MongoDB
        updateUserWatchHistory(username, videoId);

        // Send a confirmation message back to the client
        std::string response = "Watch history updated for user: " + username;
        int sent_bytes = send(client_sock, response.c_str(), response.size(), 0);
        if (sent_bytes < 0) {
            perror("Error sending data to client");
        }
    }

    // Close the client socket after handling communication
    close(client_sock);
}

int main() {
    const int server_port = 5555;

    // Set up signal handler for graceful shutdown
    signal(SIGINT, handle_signal);

    // Create server socket
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        perror("Error creating socket");
        return -1;
    }

    // Initialize server address structure
    struct sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));  // Zero out the structure
    sin.sin_family = AF_INET;      // Set address family to IPv4
    sin.sin_addr.s_addr = INADDR_ANY;  // Accept connections from any IP
    sin.sin_port = htons(server_port);  // Convert port number to network byte order

    // Bind the socket to the server address and port
    if (bind(sock, (struct sockaddr *) &sin, sizeof(sin)) < 0) {
        perror("Error binding socket");
        close(sock);
        return -1;
    }

    // Start listening for incoming connections
    if (listen(sock, 5) < 0) {
        perror("Error listening on socket");
        close(sock);
        return -1;
    }

    cout << "Server is listening on port " << server_port << "..." << endl;

    while (server_running) {
        // Accept incoming client connections
        struct sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);
        int client_sock = accept(sock, (struct sockaddr *) &client_sin, &addr_len);
        if (client_sock < 0) {
            if (server_running) {
                perror("Error accepting client connection");
            }
            continue; // Continue accepting new connections
        }

        // Create a new thread to handle the client
        thread client_thread(handle_client, client_sock);

        // Detach the thread so it runs independently
        client_thread.detach();
    }

    // Close the server socket
    close(sock);

    cout << "Server shut down gracefully." << endl;

    return 0;
}
