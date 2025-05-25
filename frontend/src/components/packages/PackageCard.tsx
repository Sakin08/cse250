import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, DollarSign } from 'lucide-react';
import { TravelPackage } from '../../types';

interface PackageCardProps {
  travelPackage: TravelPackage;
}

const PackageCard: React.FC<PackageCardProps> = ({ travelPackage }) => {
  const { id, title, location, price, duration, imageUrl, ratings } = travelPackage;
  
  // Calculate average rating
  const averageRating = ratings.length 
    ? (ratings.reduce((sum, rating) => sum + rating.stars, 0) / ratings.length).toFixed(1) 
    : '0.0';

  return (
    <Link to={`/packages/${id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg shadow-md text-sm font-medium flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" fill="#FACC15" />
            {averageRating}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">{title}</h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 text-blue-600 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm">{duration} days</span>
            </div>
            
            <div className="flex items-center font-semibold text-gray-800">
              <DollarSign className="w-4 h-4 text-orange-600" />
              {price.toLocaleString()}
            </div>
          </div>
          
          <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;