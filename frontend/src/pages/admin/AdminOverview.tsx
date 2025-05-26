import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Users, Calendar, DollarSign, TrendingUp, ArrowUpRight, Info } from 'lucide-react';
import { useDestinations } from '../../contexts/DestinationsContext';
import { mockBookings } from '../../data/mockData';

const AdminOverview: React.FC = () => {
  const { packages } = useDestinations();
  const navigate = useNavigate();

  // Memoized stats calculation
  const stats = useMemo(() => {
    const totalPackages = packages.length;
    const activeBookings = mockBookings.filter(b => b.status === 'confirmed').length;
    const totalUsers = 24; // mock value
    
    const revenue = mockBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

    // Unique popular destinations (max 5)
    const popularDestinations = [...new Set(packages.map(p => p.location.split(',')[0].trim()))].slice(0, 5);

    // Sort recent bookings by date desc, take top 3
    const recentBookings = [...mockBookings]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);

    return { totalPackages, activeBookings, totalUsers, revenue, popularDestinations, recentBookings };
  }, [packages]);

  // Helper: format currency nicely
  const formatCurrency = (num: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

  // Helper: get relative time like "3 days ago"
  const timeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return '1 day ago';
    return `${diff} days ago`;
  };

  // Booking status badge colors
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Packages */}
        <StatCard
          title="Total Packages"
          value={stats.totalPackages}
          icon={<Package className="h-6 w-6 text-blue-600" />}
          iconBg="bg-blue-100"
          trend="12%"
          trendIcon={<TrendingUp className="w-4 h-4 mr-1" />}
          ariaLabel="Total number of packages"
        />
        
        {/* Active Bookings */}
        <StatCard
          title="Active Bookings"
          value={stats.activeBookings}
          icon={<Calendar className="h-6 w-6 text-green-600" />}
          iconBg="bg-green-100"
          trend="8%"
          trendIcon={<TrendingUp className="w-4 h-4 mr-1" />}
          ariaLabel="Total active bookings"
        />
        
        {/* Total Users */}
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="h-6 w-6 text-purple-600" />}
          iconBg="bg-purple-100"
          trend="24%"
          trendIcon={<TrendingUp className="w-4 h-4 mr-1" />}
          ariaLabel="Total users"
        />
        
        {/* Revenue */}
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.revenue)}
          icon={<DollarSign className="h-6 w-6 text-orange-600" />}
          iconBg="bg-orange-100"
          trend="16%"
          trendIcon={<TrendingUp className="w-4 h-4 mr-1" />}
          ariaLabel="Total revenue earned"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Destinations */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Popular Destinations</h2>
            <button
              onClick={() => navigate('/admin/packages')}
              className="text-sm text-blue-600 hover:text-blue-800"
              aria-label="View all packages"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {stats.popularDestinations.map((destination, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3"
                    aria-label={`Rank ${index + 1}`}
                  >
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
            <QuickActionButton
              onClick={() => navigate('/admin/add-package')}
              icon={<Package className="w-5 h-5 text-blue-600" />}
              iconBg="bg-blue-100"
              label="Add Package"
            />
            <QuickActionButton
              onClick={() => navigate('/admin/users')}
              icon={<Users className="w-5 h-5 text-purple-600" />}
              iconBg="bg-purple-100"
              label="View Users"
            />
            <QuickActionButton
              onClick={() => navigate('/packages')}
              icon={<ArrowUpRight className="w-5 h-5 text-green-600" />}
              iconBg="bg-green-100"
              label="View Site"
            />
            <QuickActionButton
              onClick={() => navigate('/admin/settings')}
              icon={<Users className="w-5 h-5 text-orange-600" />}
              iconBg="bg-orange-100"
              label="Settings"
            />
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Recent Bookings</h2>
            <button
              onClick={() => navigate('/admin/bookings')}
              className="text-sm text-blue-600 hover:text-blue-800"
              aria-label="View all bookings"
            >
              View All
            </button>
          </div>
          <div className="space-y-4 max-h-72 overflow-y-auto">
            {stats.recentBookings.map((booking) => {
              const packageTitle = booking.packageId === '1'
                ? 'Tropical Paradise Getaway'
                : 'African Safari Experience';
              return (
                <div
                  key={booking.id}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  aria-label={`Booking for ${packageTitle} made ${timeAgo(booking.createdAt)}`}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{packageTitle}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-600">Guests: {booking.guests}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getStatusBadgeColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <span className="font-medium">{formatCurrency(booking.totalPrice)}</span>
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

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBg: string;
  trend: string;
  trendIcon: React.ReactNode;
  ariaLabel?: string;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBg, trend, trendIcon, ariaLabel }) => (
  <div
    className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
    aria-label={ariaLabel}
  >
    <div className={`p-3 rounded-lg ${iconBg}`}>
      {icon}
    </div>
    <div className="text-right">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
      <div className="flex items-center text-green-600 text-sm">
        {trendIcon}
        <span>{trend} increase</span>
      </div>
    </div>
  </div>
);

// Quick Action Button Component
interface QuickActionProps {
  onClick: () => void;
  icon: React.ReactNode;
  iconBg: string;
  label: string;
}
const QuickActionButton: React.FC<QuickActionProps> = ({ onClick, icon, iconBg, label }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 py-3 px-4 hover:bg-gray-100 transition"
    aria-label={label}
  >
    <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

export default AdminOverview;
