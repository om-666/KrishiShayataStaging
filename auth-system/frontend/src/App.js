import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AboutPage from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cookies from 'js-cookie';
import ChatBot from './components/chatbox';
import Complain from './components/complain';
import ApplyInsuranceForm from './components/ApplyCropInsurance';
import Calculators from './components/calculator';
import Admin from './components/Admin'; // Import Admin Page
import AdminLogin from './components/AdminLogins';
import Status from './components/Status';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!Cookies.get('userAadhar'));
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => !!sessionStorage.getItem('isAdminAuthenticated'));

  const handleLoginSuccess = (aadhar) => {
    Cookies.set('userAadhar', aadhar, { expires: 7 });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove('userAadhar');
  };

  const handleAdminLogin = () => {
    sessionStorage.setItem('isAdminAuthenticated', 'true');
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAdminAuthenticated(false);
  };

  const ProtectedAdminRoute = ({ element }) => {
    return isAdminAuthenticated ? element : <Navigate to="/adminlogin" />;
  };

  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAdminAuthenticated');
    setIsAdminAuthenticated(!!authStatus);
  }, []);

  const PrivateRoute = ({ element }) => isAuthenticated ? element : <Navigate to="/login" />;
  const UnauthenticatedRoute = ({ element }) => !isAuthenticated ? element : <Navigate to="/home" />;
  const userAadhar = Cookies.get('userAadhar');

  useEffect(() => {
    setIsAuthenticated(!!userAadhar);
  }, [userAadhar]);
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <ChatBot />
      <Routes>
        <Route path="/signup" element={<UnauthenticatedRoute element={<Signup />} />} />
        <Route path="/login" element={<UnauthenticatedRoute element={<Login onLoginSuccess={handleLoginSuccess} />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard userAadhar={userAadhar} />} />} />
        <Route path="/about" element={<PrivateRoute element={<AboutPage />} />} />
        <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
        <Route path="/complain" element={<PrivateRoute element={<Complain />} />} />
        <Route path="/apply" element={<PrivateRoute element={<ApplyInsuranceForm />} />} />
        <Route path="/calculator" element={<PrivateRoute element={<Calculators />} />} />
        <Route path="/status" element={<PrivateRoute element={<Status />} />} />
        <Route path="/admin" element={<ProtectedAdminRoute element={<Admin onAdminLogout={handleAdminLogout} />} />} />
        <Route path="/adminlogin" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
        <Route path="/" element={<UnauthenticatedRoute element={<Signup />} />} />
      </Routes>
    </Router>
  );
}

export default App;
