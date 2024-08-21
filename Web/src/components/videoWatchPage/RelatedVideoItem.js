import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './RelatedVideoItem.css';
import buffering from '../../assets/loadin-place-holder.png';

function RelatedVideoItem({ id, title, author, views, date, videoURL }) {
  const [thumbnail, setThumbnail] = useState(buffering); // State for storing the thumbnail image
  const [duration, setDuration] = useState(''); // State for storing the video duration
  const canvasRef = useRef(null); // Reference to a hidden canvas element

  const captureThumbnail = useCallback(() => {
    const video = document.createElement('video'); // Create a video element
    const canvas = canvasRef.current; // Get the canvas element from the ref
    const context = canvas.getContext('2d'); // Get the 2D drawing context of the canvas

    video.src = videoURL; // Set the source of the video
    video.crossOrigin = 'anonymous'; // Allow cross-origin resource sharing if needed
    video.load(); // Load the video

    video.addEventListener('loadedmetadata', function () {
      // Calculate and set the video duration once metadata is loaded
      const minutes = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);
      setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    });

    video.currentTime = 7; // Set the time to capture the thumbnail (7 seconds)

    video.addEventListener('seeked', function () {
      // Draw the video frame onto the canvas when the seek operation completes
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL(); // Convert the canvas content to a data URL
      setThumbnail(dataURL); // Set the thumbnail state to the data URL
    }, { once: true }); // Listen for the event only once
  }, [videoURL]); // Memoize the function and add videoURL as a dependency

  useEffect(() => {
    if (videoURL) {
      captureThumbnail(); // Capture thumbnail when videoURL changes
    }
  }, [videoURL, captureThumbnail]);

  return (
    <Link to={`/video/${id}`} className="no-link-style">
      <div className="relatedVideoItem">
        <div className="thumbnail-container">
          <img src={thumbnail} alt="video thumbnail" />
          <span className="video-duration">{duration}</span>
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{author}</p>
          <p className="card-text">{views} views • {date}</p>
        </div>
        <canvas ref={canvasRef} width="320" height="180" style={{ display: 'none' }}></canvas> {/* Hidden canvas element */}
      </div>
    </Link>
  );
}

export default RelatedVideoItem;
