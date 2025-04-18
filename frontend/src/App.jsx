import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './components/Register'; // Updated import path to components directory
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
import Signin from './pages/Signin'; // ✅ NEWLY ADDED

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to false in production
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="flex h-screen bg-white">
        {isAuthenticated && (
          <Sidebar
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isAuthenticated && (
            <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} />
          )}

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white pb-20">
            <Routes>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signin" element={<Signin />} /> {/* ✅ NEW ROUTE */}

              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
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
              <Route path="/contact" element={<Contact />} />
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