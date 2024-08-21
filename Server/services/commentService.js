const Comment = require('../models/commentSchema');

const createComment = async (text, uploader, videoId) => {
  const maxId = await getCommentsMaxId() + 1;
  const comment = new Comment({id: maxId, text: text, uploader: uploader, videoId: videoId});
  return await comment.save();
};

const getCommentsByVideoId = async (videoId) => {
  return await Comment.find({ videoId: videoId });
};

const updateComment = async (id, text, videoId) => {
  const videoComments = await getCommentsByVideoId(videoId);
  const comment = videoComments.find((comment) => comment.id == id);
  if (!comment) {
    throw new Error('Comment not found');
  } else {
    comment.text = text;
    await comment.save();
    return comment;
  }
};

const deleteComment = async (id, videoId) => {
  const videoComments = await getCommentsByVideoId(videoId);
  const comment = videoComments.find((comment) => comment.id == id);
  if (!comment) {
    throw new Error('Comment not found');
  } else {
    await comment.deleteOne();
    return true;
  }};

  const getCommentsMaxId = async () => {
    const maxIdComment = await Comment.findOne().sort({ id: -1 }).exec();
    return maxIdComment ? maxIdComment.id : 0;
  }

module.exports = { createComment, getCommentsByVideoId, updateComment, deleteComment };
