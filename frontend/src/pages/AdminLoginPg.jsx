import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { LockClosedIcon } from '@heroicons/react/24/solid';

const AdminLoginPg = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading('Authenticating...', { id: 'auth' });

    setTimeout(() => {
      const adminName = email.split('@')[0];
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem(
        'userName',
        adminName.charAt(0).toUpperCase() + adminName.slice(1)
      );

      setLoading(false);
      toast.success(`Welcome, ${adminName}!`, { id: 'auth' });
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 flex items-center justify-center p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/60 backdrop-blur-2xl shadow-2xl border border-blue-200 rounded-3xl p-10 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-6">
          <LockClosedIcon className="w-14 h-14 text-blue-600 mb-2" />
          <h2 className="text-3xl font-extrabold text-blue-800">Admin Login</h2>
          <p className="text-sm text-gray-600 mt-1">For authorized personnel only</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white text-lg font-semibold rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPg;
