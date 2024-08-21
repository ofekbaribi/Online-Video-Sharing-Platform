import React, { useRef, useEffect, useState } from 'react';
import './VideoItem.css';
import { Link } from 'react-router-dom';
import buffering from '../../assets/loadin-place-holder.png';

function VideoItem({ id, title, author, views, date, videoURL }) {
  const [thumbnail, setThumbnail] = useState(buffering);
  const [duration, setDuration] = useState('');
  const canvasRef = useRef(null);

  // Include captureThumbnail in useEffect dependency array
  useEffect(() => {
    const captureThumbnail = () => {
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
    };

    if (videoURL) {
      captureThumbnail();
    }
  }, [videoURL]); // Dependency array includes videoURL

  return (
    <Link to={`/video/${id}`} className="no-link-style">
      <div className="video-item">
        <div className="thumbnail-container">
          <img src={thumbnail} alt="video thumbnail" />
          <span className="video-duration">{duration}</span>
        </div>
        <div className="video-info">
          <div className="video-details">
            <h3 className="title">{title}</h3>
            <p className="author">{author}</p>
            <p className="metadata">{views} views • {date}</p>
            <canvas ref={canvasRef} width="320" height="180" style={{ display: 'none' }}></canvas>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoItem;
