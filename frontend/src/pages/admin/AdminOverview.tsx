import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Users, Calendar, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useDestinations } from '../../contexts/DestinationsContext';
import { mockBookings } from '../../data/mockData';

const AdminOverview: React.FC = () => {
  const { packages } = useDestinations();
  const navigate = useNavigate();
  
  // Mock stats for demonstration
  const stats = {
    totalPackages: packages.length,
    activeBookings: mockBookings.filter(b => b.status === 'confirmed').length,
    totalUsers: 24, // Mock value
    revenue: mockBookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
    popularDestinations: [...new Set(packages.map(p => p.location.split(',')[0].trim()))]
      .slice(0, 5),
    recentBookings: mockBookings.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 3)
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Packages */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-700">Total Packages</h2>
            <div className="p-2 rounded-full bg-blue-100">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">{stats.totalPackages}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12%</span>
            </div>
          </div>
        </div>
        
        {/* Active Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-700">Active Bookings</h2>
            <div className="p-2 rounded-full bg-green-100">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">{stats.activeBookings}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>8%</span>
            </div>
          </div>
        </div>
        
        {/* Total Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-700">Total Users</h2>
            <div className="p-2 rounded-full bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>24%</span>
            </div>
          </div>
        </div>
        
        {/* Revenue */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-700">Total Revenue</h2>
            <div className="p-2 rounded-full bg-orange-100">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">${stats.revenue.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>16%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Destinations */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Popular Destinations</h2>
            <button 
              onClick={() => navigate('/admin/packages')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {stats.popularDestinations.map((destination, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{destination}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {Math.floor(Math.random() * 30) + 10} bookings
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/admin/add-package')}
              className="flex items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 rounded-full bg-blue-100">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium">Add Package</span>
            </button>
            <button
              onClick={() => navigate('/admin/users')}
              className="flex items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 rounded-full bg-purple-100">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium">View Users</span>
            </button>
            <button
              onClick={() => navigate('/packages')}
              className="flex items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 rounded-full bg-green-100">
                <ArrowUpRight className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-medium">View Site</span>
            </button>
            <button
              onClick={() => navigate('/admin/settings')}
              className="flex items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 rounded-full bg-orange-100">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
        
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Recent Bookings</h2>
            <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
              View All
            </span>
          </div>
          <div className="space-y-4">
            {stats.recentBookings.map((booking) => {
              const packageTitle = booking.packageId === '1' ? 'Tropical Paradise Getaway' : 'African Safari Experience';
              return (
                <div key={booking.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{packageTitle}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Guests: {booking.guests}
                    </span>
                    <span className="font-medium">${booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;