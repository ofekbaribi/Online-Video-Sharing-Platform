import React, { useState, useEffect } from 'react';
import RelatedVideoItem from './RelatedVideoItem';
import { useVideos } from '../../contexts/VideosContext';

function RelatedVideos() {
  const [videosList, setVideosList] = useState([]); // State to store the list of videos
  const { videos } = useVideos(); // Retrieve videos from the VideosContext

  useEffect(() => {
    setVideosList(videos); // Set the list of videos from the context when the component mounts
  }, [videos]); // Add videos as a dependency to ensure the effect runs when videos change

  return (
    <div>
      {videosList.map((video) => (
        <RelatedVideoItem key={video.id} {...video} /> // Pass video properties to RelatedVideoItem and add key
      ))}
    </div>
  );
}

export default RelatedVideos;
