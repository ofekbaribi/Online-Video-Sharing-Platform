const UserService = require('../services/userService');
const { generateToken } = require('../controllers/tokenController');

// Controller method to handle creating a new user
const createUser = async (req, res) => {
    try {
      const userData = req.body;
      const { user, token } = await UserService.createUser(userData); // Destructure user and token
      res.status(201).json({ user, token }); // Send user and token in response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Controller method to handle getting a user by username
const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserService.getUserByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller method to handle updating a user by username
const updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    const { firstName, lastName, image } = req.body;
    const user = await UserService.updateUser(username, firstName, lastName);
    if (image) {
      const updatedImageUser = await UserService.updateProfilePicture(username, image);
      user.image = updatedImageUser.image;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;
    const verifyUser = await UserService.authenticateUser(username, currentPassword);
    if (!verifyUser) { 
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
    const user = await UserService.updatePassword(username, newPassword);
    const token = generateToken(user);
    user.password = null;
    res.status(200).json({user: user, token: token});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller method to handle deleting a user by username
const deleteUser = async (req, res) => {
    try {
      const { username } = req.params;
      const { password } = req.body;

      const user = await UserService.authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Delete user logic
      const deletedUser = await UserService.deleteUser(username);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(deletedUser);
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: error.message });
    }
  };

const checkUsernameExists = async (req, res) => {
    try {
      const username = req.params.username;
      const exists = await UserService.checkUsernameExists(username);
      res.status(200).json({ exists });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getPictureByUsername = async (req, res) => {
    try {
      const username = req.params.username;
      const profilePicture = await UserService.getPictureByUsername(username);
      res.status(200).json({ profilePicture });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getVideosByUploader = async (req, res) => {
    try {
      const uploader = req.params.id;
      const videos = await UserService.getVideosByUploader(uploader);
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  createUser, 
  getUserByUsername, 
  updateUser, 
  deleteUser, 
  checkUsernameExists,
  getPictureByUsername,
  updatePassword,
  getVideosByUploader,
};