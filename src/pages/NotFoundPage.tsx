import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 text-blue-600 flex justify-center">
          <MapPin className="h-16 w-16" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for seems to have wandered off the map.
          Let's get you back on the right path.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate('/packages')}
            className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Browse Packages
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;