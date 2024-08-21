const express = require('express');
const { loginUser, verifyUserToken } = require('../controllers/tokenController');
const router = express.Router();

// Define route for logging in
router.post('/', loginUser);

// Define route for verifying token
router.post('/verifyToken', verifyUserToken);

module.exports = router;
