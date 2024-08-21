const User = require('../models/userSchema'); // Import the User model
const Comment = require('../models/commentSchema'); // Import the Comment model
const Video = require('../models/videoSchema'); // Import the Video model
const VideoService = require('./videoService'); // Import the video service
const bcrypt = require('bcryptjs');

// Create a new user
const createUser = async (userData) => {
  try {
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    userData.firstName = userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1);
    userData.lastName = userData.lastName.charAt(0).toUpperCase() + userData.lastName.slice(1);

    const user = new User(userData);
    await user.save();

    // Generate a token for the user
    const tokenController = require('../controllers/tokenController');
    const token = tokenController.generateToken(user);

    return { user, token };
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Authenticate a user
const authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }
    return user;
  } catch (error) {
    throw new Error(`Error authenticating user: ${error.message}`);
  }
};

// Get a user by username
const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    user.password = null;
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

// Update a user by username
const updateUser = async (username, firstName, lastName) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    user.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    user.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

// Delete a user by username
const deleteUser = async (username) => {
    try {
      // Delete videos first
      const userVideos = await VideoService.getVideosByUploader(username);
      if (userVideos) {
        for (const video of userVideos) {
          await VideoService.deleteVideo(video.id);
        }
      }
  
      // Delete comments
      await Comment.deleteMany({ uploader: username });
  
      // Delete user
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new Error('User not found');
      }
      await user.deleteOne();
      return user;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  };
  

// Check if a username exists
const checkUsernameExists = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user ? true : false;
  } catch (error) {
    throw new Error(`Error checking username: ${error.message}`);
  }
};

const getPictureByUsername = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    return user ? user.image : null;
  } catch (error) {
    throw new Error(`Error fetching user's profile picture: ${error.message}`);
  }
};

const updatePassword = async (username, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOne({ username: username});
    if (!user) {
      throw new Error('User not found');
    }
    user.password = hashedPassword;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error updating password: ${error.message}`);
  }
};

const getVideosByUploader = async (uploader) => {
  try {
    const videos = await Video.find({ uploader: uploader });
    return videos;
  } catch (error) {
    throw new Error(`Error fetching videos by uploader: ${error.message}`);
  }
};

const updateProfilePicture = async (username, image) => {
  try {
    const user = await User.findOne({ username });
    user.image = image;
    await user.save();
    user.password = null;
    return user;
  } catch (error) {
    throw new Error(`Error updating profile picture: ${error.message}`);
  }
};

module.exports = {
  createUser,
  authenticateUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  checkUsernameExists,
  getPictureByUsername,
  updatePassword,
  getVideosByUploader,
  updateProfilePicture
};
