import React, { createContext, useContext, useState } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

// Provider component to wrap around the app and provide theme functionality
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme mode (dark mode or light mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle between dark mode and light mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode); // Toggle the current mode
  };

  // Provide the context value to be consumed by components
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children} {/* Render children components wrapped by this provider */}
    </ThemeContext.Provider>
  );
};

// Custom hook to easily access theme context from any component
export const useTheme = () => useContext(ThemeContext);
