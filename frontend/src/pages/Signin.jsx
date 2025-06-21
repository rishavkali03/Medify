import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaGithub } from 'react-icons/fa';

const BASE_URL = import.meta.env.VITE_BACKEND_URL_DEV;

const Signin = ({ setIsAuthenticated, onAuthSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('username', data.username);
        if (onAuthSuccess) onAuthSuccess(data.access_token, data.username);
        if (setIsAuthenticated) setIsAuthenticated(true);
        navigate('/chatbot'); // Redirect to a protected page
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.detail || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', provider + 'User');
      navigate('/');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Sign In</h2>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end mt-1">
              <button type="button" className="text-xs text-blue-600 hover:text-blue-800">
                Forgot password?
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account? {' '}
          <Link to="/register" className="text-blue-600 hover:underline cursor-pointer font-medium">
            Create Account
          </Link>
        </p>
        <div className="mt-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or sign in with</span>
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <button 
              onClick={() => handleOAuthLogin('Google')} 
              disabled={loading}
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-red-500" />
            </button>
            <button 
              onClick={() => handleOAuthLogin('Facebook')} 
              disabled={loading}
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaFacebookF className="text-blue-600" />
            </button>
            <button 
              onClick={() => handleOAuthLogin('Github')} 
              disabled={loading}
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaGithub className="text-black" />
            </button>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;