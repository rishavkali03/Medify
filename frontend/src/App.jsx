import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Register from './components/Register';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Emergency from './pages/Emergency';
import QuickCheckup from './pages/QuickCheckup';
import HealthMetrics from './pages/HealthMetrics';
import Appointments from './pages/Appointments';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import AdminLoginPg from './pages/AdminLoginPg';
import About from './pages/About';
import Signin from './pages/Signin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    setIsAuthenticated(!!token && !!username);
  }, []);

  const handleAuthSuccess = (token, username) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
  };

  // ProtectedRoute checks for both access_token and username in localStorage
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    if (!token || !username) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register onAuthSuccess={handleAuthSuccess} />} />
              <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} onAuthSuccess={handleAuthSuccess} />} />
              <Route path="/chatbot" element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              } />
              <Route path="/emergency" element={
                <ProtectedRoute>
                  <Emergency />
                </ProtectedRoute>
              } />
              <Route path="/quick-checkup" element={
                <ProtectedRoute>
                  <QuickCheckup />
                </ProtectedRoute>
              } />
              <Route path="/health-metrics" element={
                <ProtectedRoute>
                  <HealthMetrics />
                </ProtectedRoute>
              } />
              <Route path="/appointments" element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              } />
              <Route path="/landing" element={
                <ProtectedRoute>
                  <Landing />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } />
              <Route path="/admin-login" element={<AdminLoginPg />} />
              <Route path="/about" element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              } />
              <Route path="*" element={<div className="p-6 text-center text-xl text-red-600">404 - Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;