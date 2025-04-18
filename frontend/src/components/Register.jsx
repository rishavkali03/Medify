import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', formData.firstName || 'User');

    navigate('/');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden transition-all hover:shadow-3xl">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3" />
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              Join Our Healthcare Platform
            </h2>
            <p className="mt-3 text-gray-600 text-sm">
              Create your account in seconds and take control of your health journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
              <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
            </div>

            <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" />
            <InputField label="Phone Number (optional)" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="(123) 456-7890" />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <PasswordField label="Password" name="password" value={formData.password} onChange={handleChange} show={showPassword} setShow={setShowPassword} />
              <PasswordField label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} show={showConfirmPassword} setShow={setShowConfirmPassword} />
            </div>

            <div className="flex items-start space-x-2">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 rounded-md"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 underline hover:text-blue-500">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="text-blue-600 underline hover:text-blue-500">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Join Now'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 underline hover:text-blue-500">Sign in</Link>
          </div>

          <div className="mt-10 pt-4 border-t text-xs text-gray-600 flex justify-center space-x-4">
            <span>Trusted by healthcare professionals</span>
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span>HIPAA Compliant</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-4 px-8 text-white text-xs flex justify-between items-center">
          <p>© {new Date().getFullYear()} Your Healthcare Platform</p>
          <div className="flex space-x-2">
            <span className="bg-white bg-opacity-20 p-1 rounded-full">🔒</span>
            <span className="bg-white bg-opacity-20 p-1 rounded-full">💉</span>
            <span className="bg-white bg-opacity-20 p-1 rounded-full">🩺</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable input field
const InputField = ({ label, name, type = 'text', value, onChange, placeholder }) => (
  <div className="group">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all sm:text-sm"
    />
  </div>
);

// Password field with show/hide
const PasswordField = ({ label, name, value, onChange, show, setShow }) => (
  <div className="group">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <input
        id={name}
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
      >
        {show ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
      </button>
    </div>
  </div>
);

export default Register;
