import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import './Signup.css';
import backgroundImageUrl from '../Images/farmer.webp'; // Correct import for image

function Signup() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // Initialize navigate function from useNavigate
  const navigate = useNavigate();

  // Handle Signup
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        fullName,
        phone,
        aadhar,
        address,
        email,
        password
      });
      setMessage(response.data.message);
      // Redirect to login page if signup is successful
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Parallax
      bgImage={backgroundImageUrl} // Use the imported image
      strength={300}
      bgImageStyle={{ height: '100%', objectFit: 'cover' }}
    >
      <div className="signup-container">
        <h3 className="signup-title">Farmer's Signup</h3>
        <div className="signup-form-container">
          <input
            className="signup-input"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Aadhar Card Number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signup-button" onClick={handleSignup}>
            Signup
          </button>
          <p className="signup-message">{message}</p>

          {/* Link to navigate to login page */}
          <Link to="/login">
            <button className="login-button">Already an Existing User?</button>
          </Link>
        </div>
      </div>
    </Parallax>
  );
}

export default Signup;
