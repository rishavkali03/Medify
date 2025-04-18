import { useState, useEffect, useRef } from 'react';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import SignOutpg from './SignOutpg';

const Navbar = ({ setIsMobileMenuOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userName = localStorage.getItem('userName') || 'User';

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-transparent shadow-md backdrop-blur-md border-b border-gray-200 z-50 relative">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>

            {/* Center navigation links */}
            <div className="hidden md:flex space-x-10 mx-auto">
              <Link
                to="/about"
                className="text-blue-500 text-lg font-semibold tracking-wide transition duration-300 hover:text-blue-700 hover:scale-105"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-blue-500 text-lg font-semibold tracking-wide transition duration-300 hover:text-blue-700 hover:scale-105"
              >
                Contact
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-blue-500 text-lg font-semibold tracking-wide transition duration-300 hover:text-blue-700 hover:scale-105"
                >
                  {isAuthenticated ? (
                    <>
                      <UserCircleIcon className="h-6 w-6 text-blue-500" />
                      <span className="hidden sm:inline">Welcome, <span className="font-bold text-blue-700">{userName}</span></span>
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
                {showDropdown && (
                  <div className="absolute mt-2 w-56 bg-white shadow-xl rounded-xl z-50 animate-fade-in p-2">
                    {isAuthenticated ? (
                      <>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/appointments"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md"
                        >
                          My Appointments
                        </Link>
                        <button
                          onClick={() => setShowSignOutModal(true)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/signin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md"
                      >
                        Login / Signup
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-6">
              <Link
                to="/admin-login"
                className="bg-green-500 px-4 py-2 text-white text-sm rounded-md hover:bg-green-600 transition hover:scale-105 shadow-md"
              >
                Admin Login
              </Link>
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => setShowSignOutModal(true)}
                  className="bg-red-600 px-4 py-2 text-white text-sm rounded-md hover:bg-red-700 transition hover:scale-105 shadow-md"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sign Out Modal */}
      <SignOutpg isOpen={showSignOutModal} setIsOpen={setShowSignOutModal} />
    </>
  );
};

export default Navbar;
