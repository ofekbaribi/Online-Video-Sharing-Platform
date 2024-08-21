const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);
router.get('/video/:videoId', commentController.getCommentsByVideoId);
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
