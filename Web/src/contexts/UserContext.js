import React, { createContext, useContext, useState } from 'react';

// Create a context for user management
const UserContext = createContext();

// Provider component to wrap around the app and provide user-related functionality
export const UserProvider = ({ children }) => {
  // State to hold the current logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // State to hold the list of users (if needed)
  const [users, setUsers] = useState([]);

  // Function to set the current user (used for login)
  const setUser = (user) => {
    setCurrentUser(user);
  };

  // Function to add a new user to the list (if maintaining a list of users)
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // Function to get the profile picture of a user by username
  const getProfilePicture = (username) => {
    const user = users.find((user) => user.username === username);
    return user ? user.image : null;
  };

  // Function to log out the current user
  const logout = () => {
    setCurrentUser(null);
  };

  // Provide the context value to be consumed by components
  return (
    <UserContext.Provider value={{ currentUser, setUser, addUser, logout, users, getProfilePicture }}>
      {children} {/* Render children components wrapped by this provider */}
    </UserContext.Provider>
  );
};

// Custom hook to easily access user context from any component
export const useUser = () => useContext(UserContext);
