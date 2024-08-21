import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultVideos from '../data/db.json';

// Create a context for managing videos and user likes
const VideosContext = createContext();

// Provider component to wrap around the app and provide video-related functionality
export const VideosProvider = ({ children }) => {
  // State to hold the list of videos
  const [videos, setVideos] = useState([]);
  
  // State to track which users have liked which videos
  const [userLikes, setUserLikes] = useState({});

  // Load default videos from JSON when component mounts
  useEffect(() => {
    setVideos(defaultVideos); // Replace with actual fetching logic if needed
  }, []);

  // Function to add a new video to the list
  const addVideo = (video) => {
    setVideos((prevVideos) => [...prevVideos, video]);
  };

  // Function to update details of a video by ID
  const updateVideoDetails = (id, updates) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => (video.id === id ? { ...video, ...updates } : video))
    );
  };

  // Function to toggle like status of a video by a user
  const toggleLikeVideo = (userId, videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === videoId) {
          const hasLiked = userLikes[userId]?.includes(videoId);
          const updatedLikes = hasLiked ? video.likes - 1 : video.likes + 1;
          return { ...video, likes: updatedLikes };
        }
        return video;
      })
    );

    setUserLikes((prevUserLikes) => {
      const userLikedVideos = prevUserLikes[userId] || [];
      const hasLiked = userLikedVideos.includes(videoId);
      const updatedUserLikedVideos = hasLiked
        ? userLikedVideos.filter((id) => id !== videoId)
        : [...userLikedVideos, videoId];
      return { ...prevUserLikes, [userId]: updatedUserLikedVideos };
    });
  };

  // Function to delete a video by ID
  const deleteVideo = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  // Provide the context value to be consumed by components
  return (
    <VideosContext.Provider
      value={{ videos, addVideo, updateVideoDetails, toggleLikeVideo, deleteVideo, userLikes }}
    >
      {children} {/* Render children components wrapped by this provider */}
    </VideosContext.Provider>
  );
};

// Custom hook to easily access video context from any component
export const useVideos = () => useContext(VideosContext);
