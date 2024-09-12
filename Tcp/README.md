
# ViewTube - TCP Server

## Overview
The ViewTube TCP Server is responsible for handling user watch history and recommending videos based on what other users who watched the same videos have seen. This server listens for incoming connections, updates user watch history in a MongoDB database, and provides recommendations by analyzing watch history data.

## Features
- **User Watch History**: Tracks which videos a user has watched and updates the MongoDB database accordingly.
- **Video Recommendations**: Suggests videos to users based on what others who watched the same videos have also seen.
- **Multithreading**: The server handles multiple clients simultaneously using multithreading.
- **Graceful Shutdown**: Uses signal handling to shut down the server gracefully upon receiving a termination signal.

## Technologies Used
- **C++**: Core programming language for the server implementation.
- **MongoDB**: NoSQL database used to store user watch history.
- **Multithreading**: C++ threads are used to handle multiple client requests concurrently.
- **Socket Programming**: Uses sockets for client-server communication.
- **Signal Handling**: Graceful server shutdown using `SIGINT` signal.

## Prerequisites
Before running the TCP server, make sure you have the following installed:
- **C++ Compiler**: For compiling the server code (e.g., `g++`).
- **MongoDB**: A running instance of MongoDB (local or remote) to store user watch history.
- **Linux or Unix-based OS**: For socket handling and multithreading.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ofekbaribi/Online-Video-Sharing-Platform
   cd Online-Video-Sharing-Platform/Tcp Server
   ```

2. **Compile the Server**:
   ```bash
   g++ -o tcp_server server.cpp -pthread -lmongocxx -lbsoncxx
   ```

3. **Run the Server**:
   ```bash
   ./tcp_server
   ```

   The server will start and listen for connections on port `5555`.

## Working Process
- **Task Assignment**: The TCP server was developed to integrate seamlessly with the ViewTube platform’s recommendation engine, providing recommendations based on users' watch history.
- **Design Implementation**: Built with a focus on multithreaded socket communication and MongoDB for scalable data handling.
- **Coordination and Integration**: Works alongside other platform components like the web and Android apps.
- **Testing and Refinement**: Extensively tested for handling concurrent client connections and ensuring proper database updates.

## Development Team
- Ofek Baribi
- Ziv Elbaz
- Yuval Maaravi

By implementing multithreading, socket communication, and MongoDB integration, the TCP server enhances the ViewTube platform by allowing it to provide personalized video recommendations based on user behavior.
