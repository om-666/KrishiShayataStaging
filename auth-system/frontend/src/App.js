import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './index.css'; // Import Tailwind styles


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle authentication state
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Private route component
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        
        {/* Private Route */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />

        {/* Default route */}
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
