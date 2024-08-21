import React from 'react';
import VideoItem from './VideoItem';
import './VideoList.css';
import SearchResultItem from './SearchResultItem';
import { useLocation } from 'react-router-dom';

function VideoList({ videos }) {
  // Get the current location object using useLocation hook from react-router-dom
  const location = useLocation();

  // Extract the search query parameter from the URL query string
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  // Filter videos based on search query
  const filteredVideos = searchQuery 
    ? (videos ? videos.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) : [])
    : (videos ? videos : []);

  return (
    // Render different classes based on whether searchQuery is present
    <div className={searchQuery ? 'video-list' : 'video-grid'}>
      {filteredVideos.map((filteredVideo) => (
        // Render different components based on whether searchQuery is present
        searchQuery 
          ? <SearchResultItem key={filteredVideo.id} {...filteredVideo} /> 
          : <VideoItem key={filteredVideo.id} {...filteredVideo} />
      ))}
    </div>
  );
}

export default VideoList;
