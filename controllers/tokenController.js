const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Ensure this matches your .env file

const generateToken = (user) => {
  if (!secret) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.sign({ 
    username: user.username, 
    firstName: user.firstName, 
    lastName: user.lastName, 
    image: user.image 
  }, secret, { expiresIn: '24h' });
};

const verifyToken = (token) => {
  if (!secret) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.verify(token, secret);
};

// Controller method to handle logging in a user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userService = require('../services/userService');
    const user = await userService.authenticateUser(username, password);
    if (user) {
      const token = generateToken(user);
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller method to handle token verification
const verifyUserToken = (req, res) => {
  const token = req.body.token;
  
  if (typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid token format' });
  }

  try {
    const userData = verifyToken(token);
    res.json(userData);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, verifyUserToken, loginUser };
