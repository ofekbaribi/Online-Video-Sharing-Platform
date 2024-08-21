const express = require('express');
const UserController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
const router = express.Router();

// Define routes for user operations
router.post('/', UserController.createUser); // Creates a user
router.get('/check/:username', UserController.checkUsernameExists); // Checks username availability for registration
router.get('/picture/:username', UserController.getPictureByUsername); // Get the profile picture for the video details
router.put('/:username', UserController.updateUser); // Updates the user details
router.delete('/:username', UserController.deleteUser); // Deletes the user account
router.get('/:username', UserController.getUserByUsername); // Get the user details for the profile page
router.post('/password', UserController.updatePassword); // Updates the user password
router.get('/:id/videos', UserController.getVideosByUploader); // Get the videos uploaded by a user
router.route('/:username/videos/:id')
    .get(videoController.getVideo)
    .patch(videoController.updateVideo)
    .delete(videoController.deleteVideo);
module.exports = router;
