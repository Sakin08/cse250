import React from 'react';
import { Star, MapPin } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  avatar: string;
  rating: number;
  text: string;
  destination: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  avatar, 
  rating, 
  text, 
  destination 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      {/* Stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill={i < rating ? '#FACC15' : '#D1D5DB'} 
          />
        ))}
      </div>
      
      {/* Testimonial Text */}
      <p className="text-gray-600 mb-6 italic">
        "{text}"
      </p>
      
      {/* Destination */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <MapPin className="w-4 h-4 mr-1 text-blue-600" />
        {destination}
      </div>
      
      {/* Author */}
      <div className="flex items-center">
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">Verified Traveler</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;