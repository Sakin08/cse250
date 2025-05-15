import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';

  const navbarClass = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled || !isHomePage
      ? 'bg-white shadow-md py-2'
      : 'bg-transparent py-4'
  }`;

  const linkClass = `transition-colors duration-200 ${
    isScrolled || !isHomePage ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
  }`;

  const activeLinkClass = `font-medium ${
    isScrolled || !isHomePage ? 'text-blue-600' : 'text-blue-200'
  }`;

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <MapPin className={`w-6 h-6 ${
            isScrolled || !isHomePage ? 'text-blue-600' : 'text-white'
          }`} />
          <span className={`text-xl font-bold ${
            isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'
          }`}>
            TravelVista
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`${linkClass} ${location.pathname === '/' ? activeLinkClass : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/packages" 
            className={`${linkClass} ${location.pathname === '/packages' ? activeLinkClass : ''}`}
          >
            Packages
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-6">
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className={`${linkClass} ${location.pathname.includes('/admin') ? activeLinkClass : ''}`}
                >
                  Admin
                </Link>
              )}
              <Link 
                to="/profile" 
                className={`${linkClass} ${location.pathname === '/profile' ? activeLinkClass : ''}`}
              >
                Profile
              </Link>
              <button 
                onClick={logout}
                className={`flex items-center gap-1 ${linkClass}`}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className={`${linkClass} ${location.pathname === '/login' ? activeLinkClass : ''}`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={`px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300`}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-16 px-4">
          <div className="flex flex-col space-y-6 text-center pt-8">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-blue-600 text-lg py-2"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/packages" 
              className="text-gray-800 hover:text-blue-600 text-lg py-2"
              onClick={closeMobileMenu}
            >
              Packages
            </Link>
            
            {user ? (
              <>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-gray-800 hover:text-blue-600 text-lg py-2"
                    onClick={closeMobileMenu}
                  >
                    Admin
                  </Link>
                )}
                <Link 
                  to="/profile" 
                  className="text-gray-800 hover:text-blue-600 text-lg py-2"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex items-center justify-center gap-2 text-gray-800 hover:text-blue-600 text-lg py-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/login" 
                  className="text-gray-800 hover:text-blue-600 text-lg py-2"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;