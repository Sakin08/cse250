const express = require('express');
const { check } = require('express-validator');
const {
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all testimonials
router.get('/', getTestimonials);

// Get single testimonial
router.get('/:id', getTestimonial);

// Update testimonial
router.put(
  '/:id',
  protect,
  [
    check('rating', 'Rating must be between 1 and 5 if provided').optional().isFloat({ min: 1, max: 5 }),
    check('text', 'Review text is required if provided').optional().not().isEmpty()
  ],
  updateTestimonial
);

// Delete testimonial
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;