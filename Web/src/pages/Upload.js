import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/bootstrap.min.css';
import './Upload.css';
import { useVideos } from '../contexts/VideosContext';
import { useUser } from '../contexts/UserContext';

const UploadPage = () => {
  // State variables for form inputs and hooks
  const { videos, addVideo } = useVideos();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useUser();

  // Effect hook to redirect to login if currentUser is null
  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login page if currentUser is null
    }
  }, [currentUser, navigate]);

  // Function to handle form submission (video upload)
  const handleUpload = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (!title || !description || !videoFile) {
      alert('Please fill in all fields.');
      return;
    }

    // Function to get video duration asynchronously
    const getVideoDuration = (file) => {
      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          resolve(video.duration);
        };
        video.src = URL.createObjectURL(file);
      });
    };

    // Function to format video duration into HH:MM:SS format
    const formatDuration = (duration) => {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);
      if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    };

    // Generate unique ID for new video
    const id = videos.reduce((maxId, video) => Math.max(video.id, maxId), 0) + 1;

    // Calculate video duration and format it
    const durationInSeconds = await getVideoDuration(videoFile);
    const duration = formatDuration(durationInSeconds);

    // Prepare metadata for new video
    const metadata = {
      id,
      title,
      description,
      author: currentUser.username,
      videoURL: URL.createObjectURL(videoFile),
      date: new Date().toLocaleDateString(),
      views: 0,
      likes: 0,
      duration
    };

    // Add new video to context
    addVideo(metadata);

    // Show success message and navigate to home page
    alert('Video uploaded successfully.');
    navigate('/');
  };

  return (
    <div className="upload-page">
      <div className="container">
        <h2>Upload Video</h2>
        <form onSubmit={handleUpload}>
          {/* Title input */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description textarea */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Video file input */}
          <div className="mb-3">
            <label htmlFor="videoFile" className="form-label">Video File</label>
            <input
              type="file"
              className="form-control"
              id="videoFile"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
