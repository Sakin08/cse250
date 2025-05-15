import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Clock, Check, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDestinations } from '../contexts/DestinationsContext';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPackageById, addRating } = useDestinations();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const travelPackage = getPackageById(id || '');
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [ratingValue, setRatingValue] = useState<number>(5);
  const [ratingComment, setRatingComment] = useState<string>('');
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    if (travelPackage) {
      document.title = `${travelPackage.title} | TravelVista`;
    }
  }, [travelPackage]);

  if (!travelPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Not Found</h2>
          <p className="text-gray-600 mb-6">The travel package you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/packages')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse All Packages
          </button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/booking/${id}` } } });
      return;
    }
    
    if (!selectedDate) {
      alert('Please select a travel date');
      return;
    }
    
    navigate(`/booking/${id}`, { 
      state: { 
        date: selectedDate,
        guests: guestCount,
        totalPrice: travelPackage.price * guestCount 
      } 
    });
  };

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (ratingValue < 1 || !ratingComment) {
      alert('Please provide both a rating and a comment');
      return;
    }
    
    addRating(travelPackage.id, {
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      userName: user.name,
      stars: ratingValue,
      comment: ratingComment,
      date: new Date().toISOString().split('T')[0]
    });
    
    setRatingComment('');
    setShowRatingForm(false);
  };

  // Placeholder for multiple images (would normally come from the API)
  const packageImages = [
    travelPackage.imageUrl,
    'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ];

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === packageImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? packageImages.length - 1 : prevIndex - 1
    );
  };

  // Calculate average rating
  const averageRating = travelPackage.ratings.length 
    ? (travelPackage.ratings.reduce((sum, r) => sum + r.stars, 0) / travelPackage.ratings.length).toFixed(1) 
    : '0.0';

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to packages</span>
        </button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-80 md:h-96 lg:h-[450px] overflow-hidden">
            <img 
              src={packageImages[activeImageIndex]} 
              alt={travelPackage.title}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button 
                onClick={prevImage}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {packageImages.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === activeImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
            
            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" fill="#FACC15" />
              {averageRating} ({travelPackage.ratings.length})
            </div>
          </div>
          
          <div className="p-6 lg:p-8">
            {/* Package Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{travelPackage.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <span>{travelPackage.location}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-600 mr-1" />
                  <span>{travelPackage.duration} days</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-orange-600 mr-1" />
                  <span>{travelPackage.availableDates.length} available dates</span>
                </div>
                <div className="flex items-center font-medium text-gray-800">
                  <span className="text-lg">${travelPackage.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 ml-1">per person</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {travelPackage.description}
                  </p>
                </div>
                
                {/* Inclusions */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">What's Included</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {travelPackage.inclusions.map((inclusion, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Ratings & Reviews */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Reviews</h2>
                    {user && !showRatingForm && (
                      <button 
                        onClick={() => setShowRatingForm(true)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Write a Review
                      </button>
                    )}
                  </div>
                  
                  {showRatingForm && (
                    <form onSubmit={handleSubmitRating} className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h3 className="font-medium mb-3">Share Your Experience</h3>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRatingValue(star)}
                              className="focus:outline-none"
                            >
                              <Star 
                                className={`w-6 h-6 ${star <= ratingValue ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill={star <= ratingValue ? '#FACC15' : '#D1D5DB'}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Review
                        </label>
                        <textarea
                          id="comment"
                          rows={4}
                          value={ratingComment}
                          onChange={(e) => setRatingComment(e.target.value)}
                          placeholder="Share your experience about this package..."
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Submit Review
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowRatingForm(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                  
                  {travelPackage.ratings.length > 0 ? (
                    <div className="space-y-6">
                      {travelPackage.ratings.map((rating) => (
                        <div key={rating.id} className="pb-6 border-b border-gray-200 last:border-0">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">{rating.userName}</div>
                            <div className="text-sm text-gray-500">{rating.date}</div>
                          </div>
                          <div className="flex mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < rating.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill={i < rating.stars ? '#FACC15' : '#D1D5DB'}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{rating.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No reviews yet. Be the first to leave a review!</p>
                  )}
                </div>
              </div>
              
              {/* Booking Card */}
              <div>
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">Book This Package</h3>
                  
                  <div className="space-y-4 mb-6">
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Date
                      </label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a date</option>
                        {travelPackage.availableDates.map((date) => (
                          <option key={date} value={date}>
                            {format(new Date(date), 'MMM dd, yyyy')}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Guest Count */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Guests
                      </label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={guestCount}
                          onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setGuestCount(guestCount + 1)}
                          className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Calculation */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">
                        ${travelPackage.price.toLocaleString()} x {guestCount} {guestCount === 1 ? 'person' : 'people'}
                      </span>
                      <span>${(travelPackage.price * guestCount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${(travelPackage.price * guestCount).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleBookNow}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Book Now
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    No payment required yet. You'll reserve now and pay later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;