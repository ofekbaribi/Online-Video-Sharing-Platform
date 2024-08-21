const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET; // Ensure this matches your .env file

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token); // Log the token

  try {
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = { authenticateJWT };
