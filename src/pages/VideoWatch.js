import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../components/videoWatchPage/VideoPlayer';
import VideoDetails from '../components/videoWatchPage/VideoDetails';
import CommentsSection from '../components/videoWatchPage/CommentsSection';
import RelatedVideos from '../components/videoWatchPage/RelatedVideos';
import Navbar from '../components/commonComponents/Navbar';
import Sidebar from '../components/commonComponents/Sidebar';
import './VideoWatch.css';
import { useVideos } from '../contexts/VideosContext';

function VideoWatch() {
  // State variables
  const { videos } = useVideos(); // Accessing video context
  const { videoId } = useParams(); // Getting videoId from URL params
  const [video, setVideo] = useState(null); // State for the current video
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const navigate = useNavigate(); // Navigation hook from React Router

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Effect to fetch video details based on videoId
  useEffect(() => {
    const getVideoDetails = () => {
      if (videos.length === 0) {
        setLoading(true);
        return; // Return early if videos are not yet loaded
      }

      // Find the video with matching videoId from context
      const videoData = videos.find(video => video.id === parseInt(videoId, 10));
      if (videoData) {
        setVideo(videoData); // Set found video to state
        setError(null); // Clear any previous error
      } else {
        setError('Video not found'); // Set error if video not found
      }
      setLoading(false); // Update loading status
    };

    getVideoDetails(); // Call the function to fetch video details
  }, [videoId, videos]); // Dependency array ensures effect runs when videoId or videos change

  // Effect to scroll to top when videoId changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on videoId change
  }, [videoId]);

  // Handle search function
  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query state
    navigate(`/?search=${query}`); // Navigate to search results with query parameter
  };

  // Render loading state if video is not loaded yet
  if (loading) {
    return <div></div>;
  }

  // Render error state if video is not found
  if (error) {
    return <div>{error}</div>;
  }

  // Render video watch page with components
  return (
    <div>
      {/* Navbar component with sidebar toggle and search functionality */}
      <Navbar toggleSidebar={toggleSidebar} onSearch={handleSearch} />
      {/* Sidebar component */}
      <Sidebar isOpen={sidebarOpen} />
      {/* Main container for video details */}
      <div className="videoMain-container">
        {/* VideoPlayer component displaying the video */}
        <VideoPlayer videoUrl={video.videoURL} />
        {/* VideoDetails component displaying details about the video */}
        <VideoDetails video={video} />
        {/* CommentsSection component for displaying and adding comments */}
        <CommentsSection videoId={video.id} />
      </div>
      {/* RelatedVideos component displaying videos related to the current video */}
      <div className="relatedVideosBar">
        <RelatedVideos/>
      </div>
    </div>
  );
}

export default VideoWatch;
