import videos from './db.json'; // Importing video data from db.json

// Function to fetch the entire list of videos
export const fetchVideosList = async () => {
  return videos; // Simply returns the imported videos array
};

// Function to fetch details of a specific video by ID
export const fetchVideoDetails = async (videoId) => {
  // Using Array.find to locate the video with matching ID
  return videos.find(video => video.id === parseInt(videoId, 10));
};
