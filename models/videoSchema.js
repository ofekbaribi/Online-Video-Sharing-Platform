const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Video = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploader: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [String],
        default: []
      },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Video', Video);
