import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import './Login.css';
import backgroundImageUrl from '../Images/farmer.webp';

function Login({ onLoginSuccess }) { // Accept onLoginSuccess prop
  const [aadhar, setAadhar] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { aadhar, password });
      
      // Check if login is successful
      if (response.status === 200) {
        setMessage('Login successful!');
        onLoginSuccess(); // Set authentication state in App.js
        navigate('/home'); // Redirect to home
      } else {
        setMessage('Invalid Aadhar number or password.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <Parallax
      bgImage={backgroundImageUrl}
      strength={300}
      style={{ height: '100vh' }}
      bgImageStyle={{ height: '100vh', width: '100vw', objectFit: 'cover' }}
    >
      <div className="login-container pt-16 ">
        <h3 className="login-title">Login</h3>
        <div className="login-form-container">
          {/* Aadhar Input */}
          <input
            className="login-input"
            type="text"
            placeholder="Aadhar Number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
          />
          {/* Password Input */}
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Login Button */}
          <button className="login-button" onClick={handleLogin}>Login</button>
          {/* Display a message (error or success) */}
          <p className="login-message">{message}</p>
        </div>
      </div>
    </Parallax>
  );
}

export default Login;
