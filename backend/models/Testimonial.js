const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  text: {
    type: String,
    required: [true, 'Please add review text'],
    maxlength: [500, 'Review cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Prevent user from submitting more than one review per package
TestimonialSchema.index({ package: 1, user: 1 }, { unique: true });

// Static method to calculate average rating
TestimonialSchema.statics.calcAverageRating = async function(packageId) {
  const stats = await this.aggregate([
    {
      $match: { package: packageId }
    },
    {
      $group: {
        _id: '$package',
        avgRating: { $avg: '$rating' },
        numRatings: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await this.model('Package').findByIdAndUpdate(packageId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].numRatings
    });
  } else {
    await this.model('Package').findByIdAndUpdate(packageId, {
      ratingsAverage: 0,
      ratingsQuantity: 0
    });
  }
};

// Call calcAverageRating after save
TestimonialSchema.post('save', function() {
  this.constructor.calcAverageRating(this.package);
});

// Populate user info when querying
TestimonialSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name'
  });
  
  next();
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);