const commentService = require('../services/commentService');

const createComment = async (req, res) => {
  try {
    res.json(await commentService.createComment(req.body.text, req.body.uploader, req.body.videoId));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByVideoId = async (req, res) => {
    const comment = await commentService.getCommentsByVideoId(req.params.videoId);
    if (!comment) {
    return res.status(404).json({ errors: ['comments not found'] });
    }

    res.json(comment);
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const { videoId } = req.body;
    const comment = await commentService.updateComment(id, text, videoId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { videoId } = req.query;
    const deleted = await commentService.deleteComment(id, videoId);
    if (!deleted) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createComment, getCommentsByVideoId, updateComment, deleteComment };
