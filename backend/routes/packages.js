const express = require('express');
const { check } = require('express-validator');
const {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');
const { getPackageTestimonials, addTestimonial } = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all packages
router.get('/', getPackages);

// Get single package
router.get('/:id', getPackage);

// Create new package (admin only)
router.post(
  '/',
  protect,
  authorize('admin'),
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('duration', 'Duration is required').isNumeric(),
    check('groupSize', 'Group size is required').isNumeric(),
    check('price', 'Price is required').isNumeric(),
    check('location', 'Location is required').not().isEmpty(),
    check('imageCover', 'Cover image is required').not().isEmpty()
  ],
  createPackage
);

// Update package (admin only)
router.put('/:id', protect, authorize('admin'), updatePackage);

// Delete package (admin only)
router.delete('/:id', protect, authorize('admin'), deletePackage);

// Get testimonials for a package
router.get('/:packageId/testimonials', getPackageTestimonials);

// Add testimonial to a package
router.post(
  '/:packageId/testimonials',
  protect,
  [
    check('rating', 'Rating is required and must be between 1 and 5').isFloat({ min: 1, max: 5 }),
    check('text', 'Review text is required').not().isEmpty()
  ],
  addTestimonial
);

module.exports = router;