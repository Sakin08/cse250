import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Booking } from '../types';
import { mockBookings } from '../data/mockData';
import { format } from 'date-fns';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Update document title
  useEffect(() => {
    document.title = 'My Profile | TravelVista';
  }, []);

  // Load user bookings
  useEffect(() => {
    if (user) {
      // In a real app, this would be an API call
      const filteredBookings = mockBookings.filter(booking => booking.userId === user.id);
      setUserBookings(filteredBookings);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // This would actually update the user profile in a real app
    alert('Profile updated successfully');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    // This would actually change the password in a real app
    alert('Password changed successfully');
    
    // Reset password fields
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  // Get status color/icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { 
          color: 'text-green-600', 
          bgColor: 'bg-green-50', 
          icon: <CheckCircle className="w-5 h-5 text-green-600" /> 
        };
      case 'pending':
        return { 
          color: 'text-yellow-600', 
          bgColor: 'bg-yellow-50', 
          icon: <Clock className="w-5 h-5 text-yellow-600" /> 
        };
      case 'cancelled':
        return { 
          color: 'text-red-600', 
          bgColor: 'bg-red-50', 
          icon: <XCircle className="w-5 h-5 text-red-600" /> 
        };
      default:
        return { 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-50', 
          icon: <Clock className="w-5 h-5 text-gray-600" /> 
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="bg-blue-100 rounded-full h-24 w-24 flex items-center justify-center text-blue-600 text-3xl font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold mb-2">{user?.name}</h1>
                <p className="text-gray-600 mb-1">{user?.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {format(new Date(), 'MMMM yyyy')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'bookings'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile Settings
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Your Travel Bookings</h2>
                
                {userBookings.length > 0 ? (
                  <div className="space-y-6">
                    {userBookings.map(booking => {
                      const statusInfo = getStatusInfo(booking.status);
                      return (
                        <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <h3 className="font-semibold text-lg mb-1">
                                {/* This would use the package title in a real app */}
                                {booking.packageId === '1' ? 'Tropical Paradise Getaway' : 'African Safari Experience'}
                              </h3>
                              
                              <div className="flex items-center text-gray-600 text-sm mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>
                                  {/* This would use the package location in a real app */}
                                  {booking.packageId === '1' ? 'Bali, Indonesia' : 'Serengeti, Tanzania'}
                                </span>
                              </div>
                              
                              <div className="flex items-center text-gray-600 text-sm">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{format(new Date(booking.date), 'MMMM dd, yyyy')}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <div className={`${statusInfo.bgColor} px-3 py-1 rounded-full flex items-center mb-2`}>
                                {statusInfo.icon}
                                <span className={`ml-1 text-sm font-medium ${statusInfo.color} capitalize`}>
                                  {booking.status}
                                </span>
                              </div>
                              
                              <div className="text-gray-800 font-semibold">
                                ${booking.totalPrice.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-2">
                            <button
                              onClick={() => navigate(`/packages/${booking.packageId}`)}
                              className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              View Package
                            </button>
                            
                            {booking.status !== 'cancelled' && (
                              <button className="px-4 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                Manage Booking
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
                    <button
                      onClick={() => navigate('/packages')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse Packages
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                
                {/* Personal Information Form */}
                <div className="mb-8">
                  <h3 className="font-medium text-gray-800 mb-4">Personal Information</h3>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Password Change Form */}
                <div>
                  <h3 className="font-medium text-gray-800 mb-4">Change Password</h3>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;