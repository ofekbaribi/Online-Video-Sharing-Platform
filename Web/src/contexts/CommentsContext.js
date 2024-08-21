import React, { createContext, useContext, useState } from 'react';

// Create a context for comments management
const CommentsContext = createContext();

// Provider component to wrap around the app and provide comments functionality
export const CommentsProvider = ({ children }) => {
  // State to hold the comments
  const [comments, setComments] = useState([]);

  // Function to add a new comment
  const addComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  // Function to update an existing comment by its ID
  const updateComment = (id, text) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, text } : comment
      )
    );
  };

  // Function to delete a comment by its ID
  const deleteComment = (id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  // Function to get all comments related to a specific video ID
  const getCommentsByVideoId = (videoId) => {
    return comments.filter((comment) => comment.videoId === videoId);
  };

  // Provide the context value to be consumed by components
  return (
    <CommentsContext.Provider
      value={{
        comments,
        addComment,
        updateComment,
        deleteComment,
        getCommentsByVideoId,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

// Custom hook to easily access comments context from any component
export const useComments = () => useContext(CommentsContext);
