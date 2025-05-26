const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  package: {
    type: mongoose.Schema.ObjectId,
    ref: 'Package',
    required: true
  },
  startDate: {
    type: Date,
    required: [true, 'Please select a start date']
  },
  numberOfPeople: {
    type: Number,
    required: [true, 'Please specify number of people'],
    min: [1, 'Number of people must be at least 1']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Booking must have a price']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  specialRequests: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Populate user and package info when querying
BookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email phone'
  }).populate({
    path: 'package',
    select: 'name duration price location'
  });
  
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);