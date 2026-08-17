const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  signup, login, googleLogin, forgotPassword, resetPassword, getMe,
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;
