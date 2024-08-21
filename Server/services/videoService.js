const Video = require('../models/videoSchema');
const fs = require('fs');
const path = require('path');
const Comment = require('../models/commentSchema');

const createVideo = async (title, description, uploader, duration, videoUrl, thumbnailUrl) => {
    const maxId = await getMaxVideoId() + 1;
    const todayDateString = formatDate(new Date());
    const video = new Video({
        id: maxId,
        title: title,
        description: description,
        uploader: uploader,
        duration: duration,
        date: todayDateString,
        videoUrl: `/uploads/${videoUrl.split('\\')[videoUrl.split('\\').length - 1]}`,
        thumbnail: `/uploads/thumbnails/${thumbnailUrl.split('\\')[thumbnailUrl.split('\\').length - 1]}`
    });
    return await video.save();
};

const getVideos = async () => { 
    return await Video.find({}); 
};

const getVideoById = async (id) => {
    return await Video.findOne({id: id});
};


const updateVideo = async (id, title, description) => {
    const video = await getVideoById(id);   
    if (!video) { 
        return null;
    }
    video.title = title;
    video.description = description;
    await video.save();
    return video;
};

const deleteVideo = async (id) => {
    const video = await getVideoById(id);
    if (!video) { 
        return null;
    }

    await Comment.deleteMany({ videoId: id });

    const videoPath = path.join(__dirname, '..', 'public', video.videoUrl);
    fs.unlink(videoPath, (err) => {
        if (err) {
            console.error('Error deleting video file:', err);
        }
    });

    await video.deleteOne();
    return video;
};

const getMaxVideoId = async () => {
    const maxIdVideo = await Video.findOne().sort({ id: -1 }).exec();
    return maxIdVideo ? maxIdVideo.id : 0;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const userLiked = async (id, username) => {
    const video = await getVideoById(id);
    if (!video) {
        throw new Error('Video not found');
    }
    if (video.likedBy.includes(username)) {
        video.likes--;
        video.likedBy = video.likedBy.filter(likedBy => likedBy !== username);
    } else {
        video.likes++;
        video.likedBy.push(username);
    }
    await video.save();
    return true;
};

const addViewCount = async (id) => {
    const video = await getVideoById(id);
    if (!video) {
        throw new Error('Video not found');
    }
    video.views++;
    await video.save();
    return video;
};

const getHotVideos = async () => {
    try {
        const videos = await getVideos();
        if (videos.length <= 10) {
            return await shuffleArray(videos);
        }

        // Get the top 10 most viewed videos
        const hotVideos = videos.sort((a, b) => b.views - a.views).slice(0, 10);
        // Get the remaining videos excluding the top 10 most viewed
        const remainingVideos = videos.filter(video => !hotVideos.includes(video));
        // Shuffle the remaining videos
        const shuffledRemainingVideos = await shuffleArray(remainingVideos);
        // Get 10 random videos from the remaining ones
        const randomVideos = shuffledRemainingVideos.slice(0, Math.min(10, shuffledRemainingVideos.length));
        // Combine the hot and random videos
        const combinedVideos = [...hotVideos, ...randomVideos];
        // Shuffle the combined list before returning
        return await shuffleArray(combinedVideos);
    } catch (error) {
        throw new Error(`Error fetching hot videos: ${error.message}`);
    }
};

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffledArray = array.slice(); // Create a copy to avoid mutating the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
}

module.exports = {createVideo, getVideoById, getVideos, updateVideo, deleteVideo, formatDate, userLiked, addViewCount, getHotVideos };
