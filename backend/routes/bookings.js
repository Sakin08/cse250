const express = require('express');
const { check } = require('express-validator');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all bookings
router.get('/', protect, getBookings);

// Get single booking
router.get('/:id', protect, getBooking);

// Create new booking
router.post(
  '/',
  protect,
  [
    check('packageId', 'Package ID is required').not().isEmpty(),
    check('startDate', 'Start date is required').isISO8601().toDate(),
    check('numberOfPeople', 'Number of people is required and must be at least 1').isInt({ min: 1 })
  ],
  createBooking
);

// Update booking
router.put('/:id', protect, updateBooking);

// Delete booking
router.delete('/:id', protect, deleteBooking);

// Update booking status (admin only)
router.put('/:id/status', protect, authorize('admin'), updateBookingStatus);

module.exports = router;