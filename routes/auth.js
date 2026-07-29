const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe, updateProfile, getUsers, getStats, deleteUser } = require('../controllers/authController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], register);

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

router.get('/users', protect, admin, getUsers);
router.get('/stats', protect, admin, getStats);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;
