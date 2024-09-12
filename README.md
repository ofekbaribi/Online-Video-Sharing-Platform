
# ViewTube - Video Sharing Platform

## Overview
ViewTube is a comprehensive video-sharing platform that allows users to upload, watch, and interact with videos across multiple platforms, including web and mobile. The platform includes features such as video playback, commenting, like/dislike functionality, video uploading, and user management. This document details the structure and implementation of the ViewTube project, covering the Web frontend, Android mobile application, and Server-Side backend.

## Screenshots
![Screenshot 1](./Server/public/static/project%20screenshots/5.png)
![Screenshot 2](./Server/public/static/project%20screenshots/11.jpg)
![Screenshot 3](./Server/public/static/project%20screenshots/9.png)
![Screenshot 4](./Server/public/static/project%20screenshots/12.jpg)
![Screenshot 5](./Server/public/static/project%20screenshots/2.png)
![Screenshot 6](./Server/public/static/project%20screenshots/1.png)
![Screenshot 7](./Server/public/static/project%20screenshots/4.png)

## Features

### Shared Features (Across Web and Android)
- **Video Playback**: Users can watch videos with a responsive and user-friendly player.
- **Video Details Management**: View and edit uploaded video titles and descriptions.
- **Video Sharing**: Easily share videos with friends and other users.
- **Comments Section**: Interact with other users by commenting on videos.
- **Related Videos**: Explore related videos based on your current viewing.
- **User Management**: Create and manage user profiles, including likes, uploads, and comments.
- **Dark Mode**: Toggle between light and dark modes to match personal preferences.

## Technologies Used

### Web Frontend
- **Framework**: React.js
- **State Management**: Context API
- **Styling**: CSS Modules
- **Routing**: React Router

### Android Frontend
- **Framework**: Android SDK
- **Styling**: XML with Material Components

### Backend
- **Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose for object modeling)
- **Authentication**: JWT (JSON Web Tokens)
- **File Handling**: Multer (for video file and thumbnail uploads)

## Installation and Setup

### Web Project

#### Prerequisites
- **Node.js** (version 14.x or later)
- **npm** (Node Package Manager)

#### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ofekbaribi/ViewTube-Web
   cd ViewTube-Web
   npm install
   ```

2. **Run the Application**:
   ```bash
   npm start
   ```

### Android Project

#### Prerequisites
- **Android Studio** (version 4.0 or later)
- **Android device or emulator** running API level 21 (Lollipop) or higher

#### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ZivElbaz/android-video-sharing-platform
   ```

2. **Open and Run the Project**:
   - Open Android Studio.
   - Import the project you just cloned.
   - Build the project and run it on your Android device or emulator.

### Server-Side Project

#### Prerequisites
- **Node.js** (version 14.x or later)
- **npm** (Node Package Manager)
- **MongoDB** (connection string provided in environment variables)

#### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ofekbaribi/ViewTube-Server
   cd ViewTube-Server
   npm install
   ```

2. **Run the Server**:
   ```bash
   npm start
   ```

## Working Process

### Web Project
- **Task Assignment**: Each team member was assigned distinct pages to create, focusing on both design and implementation of the required logic.
- **Design Implementation**: User interfaces were designed to be intuitive and visually appealing.
- **Logical Infrastructure**: Context API was used for state management, gathering data for each component.
- **Coordination and Integration**: Team members coordinated to ensure compatibility and cohesion, integrating components into a seamless website.
- **Testing and Refinement**: After combining all components, thorough testing was conducted, followed by refinements based on feedback.

### Android Project
- **Task Assignment**: Modules like video playback, user management, and community interactions were divided among team members.
- **Design Implementation**: Mobile-specific designs were implemented to ensure an intuitive and user-friendly interface.
- **Logical Infrastructure**: Android architecture components were used for robust state management.
- **Coordination and Integration**: Regular synchronization ensured seamless integration into the mobile app.
- **Testing and Refinement**: Comprehensive testing across devices ensured smooth and bug-free performance.

### Server-Side Project
- **Task Assignment**: Specific tasks such as user authentication, video management, or comments handling were assigned to team members.
- **Implementation**: Backend logic was implemented using Express.js and MongoDB, focusing on scalability and performance.
- **Integration**: RESTful APIs were created for seamless communication between the backend and frontend.
- **Testing and Refinement**: Rigorous testing ensured the reliability and security of API endpoints.

## Development Team
- **Ofek Baribi**
- **Ziv Elbaz**
- **Yuval Maaravi**

## Project Management

Our team used Jira as our primary project management tool, following Agile methodologies. We organized our work into sprints, managed our tasks with user stories, and tracked progress through various stages, from backlog to completion. This approach ensured that we could respond flexibly to changes and maintain a steady development pace.

### Agile Methodology in Jira
- **Sprint Planning**: We began each sprint by defining user stories and tasks, estimating their effort, and prioritizing them based on the project goals.
- **Daily Standups**: We conducted daily standup meetings to discuss progress, identify blockers, and adjust our tasks as necessary.
- **Sprint Reviews and Retrospectives**: At the end of each sprint, we reviewed the completed work, demonstrated new features, and held retrospectives to discuss what went well and what could be improved.

## Android Development Approach

The Android application followed the MVVM (Model-View-ViewModel) architectural pattern, which helped us maintain a clear separation of concerns and made the codebase more modular, testable, and maintainable.

### MVVM Implementation
- **Model**: Represents the data layer, handling business logic and communication with the backend services (e.g., via REST APIs).
- **View**: The UI layer that displays data and handles user interactions.
- **ViewModel**: Acts as a bridge between the Model and the View, providing data to the UI and handling user interactions, often with LiveData for reactive programming.

This structured approach allowed us to create a scalable and robust Android application, ensuring high-quality code and a smooth user experience.


## Server-Side Development Approach

The server-side of the ViewTube platform was developed using the MVC (Model-View-Controller) architectural pattern, ensuring a clean separation of concerns and a structured codebase. This pattern helped us maintain the clarity and scalability of the backend code.

### MVC Implementation
- **Model**: Defines the data structure, handling database operations and business logic.
- **View**: Since this is a backend service, the "view" is represented by the data served to the client, typically as JSON.
- **Controller**: Manages the incoming HTTP requests, processes data via the Model, and returns the appropriate responses.

### RESTful API
We designed the server-side application to expose RESTful APIs, which enabled seamless communication between the frontend and backend. These APIs followed standard REST principles, ensuring predictable and resource-oriented endpoints, making it easier to consume and integrate with the frontend applications.

- **CRUD Operations**: Handled via RESTful routes for managing videos, comments, and user data.
- **Authentication**: Secure API endpoints using JWT for token-based authentication.
- **File Handling**: APIs for video file uploads and thumbnail storage, managed via RESTful endpoints.

