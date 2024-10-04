import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

function Login() {
  const [aadhar, setAadhar] = useState(''); // Change from email to Aadhar
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handle Login
  const handleLogin = async () => {
    try {
      // Send Aadhar and password to the backend instead of email
      const response = await axios.post('http://localhost:5000/login', { aadhar, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
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
        <p className="login-message">{message}</p>
      </div>
    </div>
  );
}

export default Login;
