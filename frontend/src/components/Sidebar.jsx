import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  ChatBubbleLeftIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  CalendarIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import logo from '../assets/logo_arogya.png'

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Chatbot', href: '/chatbot', icon: ChatBubbleLeftIcon },
    { name: 'Quick Checkup', href: '/quick-checkup', icon: UserCircleIcon },
    { name: 'Appointments', href: '/appointments', icon: CalendarIcon },
    { name: 'Health Metrics', href: '/health-metrics', icon: HeartIcon },
    { 
      name: 'Emergency', 
      href: '/emergency', 
      icon: ExclamationTriangleIcon,
      className: 'mt-auto text-red-500 hover:text-red-400 hover:bg-red-50/10'
    },
  ];

  const sidebarClasses = `fixed md:relative inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
  }`;

  const overlayClasses = `fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${
    isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`;

  return (
    <>
      {/* Hamburger Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-40 md:hidden text-blue-500 hover:text-blue-600 transition-colors"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <div className={overlayClasses} onClick={() => setIsMobileMenuOpen(false)} />
      <div className={sidebarClasses}>
        <div className="w-full min-h-screen bg-gradient-to-b from-blue-500 to-blue-400 text-white shadow-lg rounded-r-3xl flex flex-col">
          {/* Mobile close button */}
          <div className="flex justify-end p-4 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center p-4 border-b border-white/20">
            <span >
              <img src={logo} alt="" style={{ width: '55px', height: '40px' }}/>
            </span>
            <span className="text-white text-2xl font-extrabold tracking-tight ml-2">
            Arogyaमार्ग
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col px-4 space-y-2 mt-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    item.className || ''
                  } ${
                    isActive
                      ? item.name === 'Emergency' 
                        ? 'bg-red-500/20 text-red-500 shadow-lg'
                        : 'bg-white/20 text-white shadow-lg'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className={`h-6 w-6 ${
                    item.name === 'Emergency' ? 'text-red-500' : ''
                  }`} />
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white/20">
            <Link to="/profile" className="flex items-center cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="h-10 w-10 rounded-full border-2 border-white/20"
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-white">John Doe</p>
                <p className="text-xs text-white/70">Patient</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;