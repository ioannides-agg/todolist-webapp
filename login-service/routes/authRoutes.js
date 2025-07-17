const express = require('express');
const router = express.Router();
const {signup, login, validate, logout} = require('../controllers/authController');
const authToken = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', authToken, validate);

module.exports = router