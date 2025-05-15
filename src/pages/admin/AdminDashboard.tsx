import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { PlusCircle, Package, Grid, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminPackages from './AdminPackages';
import AdminPackageForm from './AdminPackageForm';
import AdminOverview from './AdminOverview';
import AdminUsers from './AdminUsers';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  
  // Update document title
  React.useEffect(() => {
    document.title = 'Admin Dashboard | TravelVista';
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) => `
    flex items-center gap-3 px-4 py-3 rounded-lg 
    ${isActive(path) 
      ? 'bg-blue-100 text-blue-700' 
      : 'text-gray-700 hover:bg-gray-100 transition-colors'}
  `;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-20 left-4 z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-16 bottom-0 left-0 w-64 bg-white border-r border-gray-200 z-30 
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <Package className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>
          
          <nav className="mt-6 space-y-1">
            <Link to="/admin" className={navLinkClass('/admin')} onClick={() => setSidebarOpen(false)}>
              <Grid className="w-5 h-5" />
              <span>Overview</span>
            </Link>
            <Link to="/admin/packages" className={navLinkClass('/admin/packages')} onClick={() => setSidebarOpen(false)}>
              <Package className="w-5 h-5" />
              <span>Packages</span>
            </Link>
            <Link to="/admin/add-package" className={navLinkClass('/admin/add-package')} onClick={() => setSidebarOpen(false)}>
              <PlusCircle className="w-5 h-5" />
              <span>Add Package</span>
            </Link>
            <Link to="/admin/users" className={navLinkClass('/admin/users')} onClick={() => setSidebarOpen(false)}>
              <Users className="w-5 h-5" />
              <span>Users</span>
            </Link>
            <Link to="/admin/settings" className={navLinkClass('/admin/settings')} onClick={() => setSidebarOpen(false)}>
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            
            <button 
              onClick={() => {
                logout();
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left mt-6"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="lg:ml-64 pt-4 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/packages" element={<AdminPackages />} />
            <Route path="/add-package" element={<AdminPackageForm />} />
            <Route path="/edit-package/:id" element={<AdminPackageForm />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/settings" element={<div className="p-4 bg-white rounded-xl shadow-sm">Settings page (placeholder)</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;