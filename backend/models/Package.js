const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  duration: {
    type: Number,
    required: [true, 'Please add tour duration in days']
  },
  groupSize: {
    type: Number,
    required: [true, 'Please add maximum group size']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  discountPrice: {
    type: Number
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  imageCover: {
    type: String,
    required: [true, 'Please add a cover image']
  },
  images: [String],
  startDates: [Date],
  itinerary: [{
    day: Number,
    description: String,
    accommodation: String,
    meals: String
  }],
  included: [String],
  excluded: [String],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'difficult'],
    default: 'medium'
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for reviews
PackageSchema.virtual('reviews', {
  ref: 'Testimonial',
  localField: '_id',
  foreignField: 'package',
  justOne: false
});

// Virtual for bookings
PackageSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'package',
  justOne: false
});

module.exports = mongoose.model('Package', PackageSchema);