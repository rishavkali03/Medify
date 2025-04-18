// src/components/SignOutpg.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const SignOutpg = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleYes = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    
    // Close modal and redirect to home
    setIsOpen(false);
    navigate('/');
  };

  const handleNo = () => {
    setIsOpen(false);
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8 transition-all transform scale-100">
          <div className="flex flex-col items-center text-center space-y-6">
            <LockClosedIcon className="w-12 h-12 text-red-500" />
            <Dialog.Title className="text-2xl font-bold text-gray-800">
              Are you sure you want to sign out?
            </Dialog.Title>
            <p className="text-gray-500">You’ll need to log in again to access your dashboard.</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleYes}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition shadow-md hover:shadow-lg"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={handleNo}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition shadow-sm hover:shadow"
              >
                No, Go Back
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SignOutpg;
