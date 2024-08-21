import React, { useEffect, useRef } from 'react';
import './VideoPlayer.css';

function VideoPlayer({ videoUrl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Load the video when the videoUrl changes
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  return (
    <div className="videoPlayer">
      {/* Video player element */}
      <video controls ref={videoRef} key={videoUrl} autoPlay>
        {/* Video source */}
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback message for browsers that do not support video tag */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
