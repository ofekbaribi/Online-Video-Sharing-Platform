const express = require('express');
const videoController = require('../controllers/videoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const videosDir = path.join(__dirname, '..', 'public', 'uploads');
const thumbnailsDir = path.join(__dirname, '..', 'public', 'uploads', 'thumbnails');

if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
    console.log('Created videos directory');
}

if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true });
    console.log('Created thumbnails directory');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'videoFile') {
            cb(null, videosDir); // Save videos in the 'public/uploads' directory
        } else if (file.fieldname === 'thumbnail') {
            cb(null, thumbnailsDir); // Save thumbnails in the 'public/uploads/thumbnails' directory
        }
    },
     filename: (req, file, cb) => {
        if (file.fieldname === 'videoFile') {
            cb(null, `${Date.now()}-${file.originalname}`); // Keep the original video filename with a timestamp
        } else if (file.fieldname === 'thumbnail') {
            console.log(file.originalname);
            cb(null, `${Date.now()}-${file.originalname}`); // Format thumbnail filename
        }
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.route('/')
    .get(videoController.getHotVideos)
    .post(upload.fields([
        { name: 'videoFile', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 }
    ]), videoController.createVideo);

router.route('/:id/like')
    .post(videoController.userLiked);

router.route('/:id/view')
    .patch(videoController.addViewCount);

router.route('/all')
    .get(videoController.getVideos);

module.exports = router;
