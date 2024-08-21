const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  text: {
     type: String,
      required: true 
    },
  uploader: 
  { type: String,
    default: "guest" 
  },
  videoId: { 
    type: Number, 
    required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
