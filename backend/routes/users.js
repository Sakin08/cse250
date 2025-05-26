const express = require('express');
const { check } = require('express-validator');
const { getUsers, getUser, updateProfile, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/', protect, authorize('admin'), getUsers);

// Get single user (admin only)
router.get('/:id', protect, authorize('admin'), getUser);

// Update user profile (user)
router.put(
  '/profile',
  protect,
  [
    check('name', 'Name is required if provided').optional().not().isEmpty(),
    check('email', 'Please include a valid email if provided').optional().isEmail()
  ],
  updateProfile
);

// Update user (admin only)
router.put(
  '/:id',
  protect,
  authorize('admin'),
  [
    check('name', 'Name is required if provided').optional().not().isEmpty(),
    check('email', 'Please include a valid email if provided').optional().isEmail(),
    check('role', 'Role must be either user or admin').optional().isIn(['user', 'admin'])
  ],
  updateUser
);

// Delete user (admin only)
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;