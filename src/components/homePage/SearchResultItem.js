import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchResultItem.css'; // Import the CSS file for SearchResultItem
import buffering from '../../assets/loadin-place-holder.png';

function SearchResultItem({ id, title, author, views, date, videoURL }) {
  const [thumbnail, setThumbnail] = useState(buffering);
  const [duration, setDuration] = useState('');
  const canvasRef = useRef(null);

  const captureThumbnail = useRef(() => {
    const video = document.createElement('video');
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    video.src = videoURL;
    video.crossOrigin = 'anonymous'; // Allow cross-origin resource sharing if needed
    video.load();

    video.addEventListener('loadedmetadata', function () {
      const minutes = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);
      setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    });

    video.currentTime = 7; // Set the time to capture the thumbnail

    video.addEventListener('seeked', function () {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL();
      setThumbnail(dataURL); // Set the thumbnail data URL as the image source
    }, { once: true });
  });

  useEffect(() => {
    captureThumbnail.current();
  }, [videoURL, captureThumbnail]);

  return (
    <Link to={`/video/${id}`} className="no-link-style">
      <div className="search-result-item">
        {/* Container for video thumbnail */}
        <div className="thumbnail-container-search">
          <img src={thumbnail} alt="video thumbnail" /> {/* Display thumbnail image */}
        </div>
        {/* Container for video information */}
        <div className="video-info">
          <div className="video-details">
            <h3 className="title">{title}</h3> {/* Title of the video */}
            <p className="author">{author}</p> {/* Author of the video */}
            {/* Display metadata: views, date, and duration */}
            <p className="metadata">{views} views • {date} • Duration: {duration}</p>
            <canvas ref={canvasRef} width="320" height="180" style={{ display: 'none' }}></canvas> {/* Hidden canvas for thumbnail capture */}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultItem;
