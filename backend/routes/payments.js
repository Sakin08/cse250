const express = require('express');
const {
  createPaymentIntent,
  confirmPayment,
  handleWebhook
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', protect, createPaymentIntent);

// Confirm payment
router.post('/confirm', protect, confirmPayment);

// Handle Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;