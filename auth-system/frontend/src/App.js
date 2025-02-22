// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AboutPage from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer'; // Import the Footer component
import Cookies from 'js-cookie'; // Import the js-cookie library
import ChatBot from './components/chatbox';
import Complain from './components/complain';
import ApplyInsuranceForm from './components/ApplyCropInsurance';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check initial authentication state from Cookies
    return !!Cookies.get('userAadhar');
  });

  // Function to handle authentication state
  const handleLoginSuccess = (aadhar) => {
    // Save the Aadhar in Cookies for persistence
    Cookies.set('userAadhar', aadhar, { expires: 7 }); // Set cookie to expire in 7 days
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove('userAadhar'); // Remove Aadhar from cookies on logout
  };

  // Private Route Component for authenticated access only
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  // Unauthenticated Route Component for login/signup access
  const UnauthenticatedRoute = ({ element }) => {
    return !isAuthenticated ? element : <Navigate to="/home" />;
  };

  // Get user Aadhar from cookies
  const userAadhar = Cookies.get('userAadhar');

  useEffect(() => {
    // If the cookie changes, update the authentication state
    setIsAuthenticated(!!userAadhar);
  }, [userAadhar]);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <ChatBot />

      <Routes>
        {/* Unauthenticated routes */}
        <Route path="/signup" element={<UnauthenticatedRoute element={<Signup />} />} />
        <Route path="/login" element={<UnauthenticatedRoute element={<Login onLoginSuccess={(aadhar) => handleLoginSuccess(aadhar)} />} />} />

        {/* Private routes (authenticated only) */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard userAadhar={userAadhar} />} />} />
        <Route path="/about" element={<PrivateRoute element={<AboutPage />} />} />
        <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
        <Route path="/complain" element={<PrivateRoute element={<Complain />} />} />
        <Route path="/apply" element={<PrivateRoute element={<ApplyInsuranceForm />} />} />

        {/* Default route */}
        <Route path="/" element={<UnauthenticatedRoute element={<Signup />} />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
