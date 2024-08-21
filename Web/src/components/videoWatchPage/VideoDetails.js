import React, { useState, useEffect } from 'react';
import './VideoDetails.css';
import '../../css/bootstrap.min.css';
import VideoOptionsBar from './VideoOptionsBar';
import editIcon from '../../assets/edit_icon.svg';
import saveIcon from '../../assets/tick_icon.svg';
import cancelIcon from '../../assets/cancel_icon.svg';
import { useUser } from '../../contexts/UserContext';
import { useVideos } from '../../contexts/VideosContext';
import { useNavigate } from 'react-router-dom';

function VideoDetails({ video }) {
  const { currentUser } = useUser();
  const { updateVideoDetails, deleteVideo } = useVideos();
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(video.title);
  const [newDescription, setNewDescription] = useState(video.description);
  const navigate = useNavigate();

  // Sync state with video prop
  useEffect(() => {
    setNewTitle(video.title);
    setNewDescription(video.description);
  }, [video]);

  // Handlers for editing title
  const handleEditTitleClick = () => setEditingTitle(true);
  const handleSaveTitleClick = () => {
    if (newTitle === '') {
      alert('Video title cannot be empty!');
    } else {
      updateVideoDetails(video.id, { title: newTitle });
      setEditingTitle(false);  
    }
  };
  const handleCancelTitleClick = () => {
    setNewTitle(video.title);
    setEditingTitle(false);
  };

  // Handlers for editing description
  const handleEditDescriptionClick = () => setEditingDescription(true);
  const handleSaveDescriptionClick = () => {
    if (newDescription === '') {
      alert('Video description cannot be empty!');
    } else {
      updateVideoDetails(video.id, { description: newDescription });
      setEditingDescription(false);
    }
  };
  const handleCancelDescriptionClick = () => {
    setNewDescription(video.description);
    setEditingDescription(false);
  };

  // Handler for deleting video
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      deleteVideo(video.id);
      navigate('/');
    }
  };

  return (
    <div>
      <div className='video-title'>
        {currentUser && currentUser.username === video.author ? (
          <>
            {!editingTitle ? (
              <p>
                {video.title}
                <button className="edit-button action-button" onClick={handleEditTitleClick}>
                  <img src={editIcon} alt="Edit title" />
                </button>
              </p>
            ) : (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Edit title"
                  className='input-box'
                />
                <button className="save-button action-button" onClick={handleSaveTitleClick}>
                  <img src={saveIcon} alt="Save title" />
                </button>
                <button className="cancel-button action-button" onClick={handleCancelTitleClick}>
                  <img src={cancelIcon} alt="Cancel editing title" />
                </button>
              </>
            )}
          </>
        ) : (
          <p>{video.title}</p>
        )}
      </div>
      
      <VideoOptionsBar video={video} />
      
      <div className='video-description'>
        {currentUser && currentUser.username === video.author ? (
          <>
            {!editingDescription ? (
              <p>
                {video.description}
                <button className="description-edit-button action-button" onClick={handleEditDescriptionClick}>
                  <img src={editIcon} alt="Edit description" />
                </button>
              </p>
            ) : (
              <>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Edit description"
                  className='edit-video-description'
                />
                <button className="description-save-button action-button" onClick={handleSaveDescriptionClick}>
                  <img src={saveIcon} alt="Save description" />
                </button>
                <button className="description-cancel-button action-button" onClick={handleCancelDescriptionClick}>
                  <img src={cancelIcon} alt="Cancel editing description" />
                </button>
              </>
            )}
          </>
        ) : (
          <p>{video.description}</p>
        )}
      </div>

      {currentUser && currentUser.username === video.author && (
        <div className="delete-button-container">
          <button className="btn btn-outline-danger" onClick={handleDeleteClick}>
            Delete Video
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoDetails;
