const videoService = require('../services/videoService');

const createVideo = async (req, res) => {
    try {
        const { title, description, duration, uploader } = req.body;
        const videoFile = req.files['videoFile'][0];
        const thumbnail = req.files['thumbnail'][0];

        const videoUrl = videoFile.path;
        const thumbnailUrl = thumbnail.path;

        const newVideo = await videoService.createVideo(title, description, uploader, duration, videoUrl, thumbnailUrl);
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getVideos = async (_, res) => {
    res.json(await videoService.getVideos());
};

const getVideo = async (req, res) => {
    const video = await videoService.getVideoById(req.params.id);
    if (!video) {
    return res.status(404).json({ errors: ['Video not found'] });
    }

    res.json(video);
};

const updateVideo = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const video = await videoService.updateVideo(id, title, description);
    if(!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};

const userLiked = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    try {
        const liked = await videoService.userLiked(id, username);
        res.json({ liked });
    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};

const deleteVideo = async (req, res) => {
    const video = await videoService.deleteVideo(req.params.id);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
}

const addViewCount = async (req, res) => {
    const video = await videoService.addViewCount(req.params.id);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};

const getHotVideos = async (req, res) => {
    try {
        const videos = await videoService.getHotVideos();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};

module.exports = {createVideo, getVideos, getVideo, updateVideo, deleteVideo, userLiked, addViewCount, getHotVideos};
