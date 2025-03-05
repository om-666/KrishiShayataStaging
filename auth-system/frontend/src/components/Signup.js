import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImageUrl from '../Images/farmer.webp';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeFeature, setActiveFeature] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0ZM7.5 15.75a3.375 3.375 0 0 1 6.75 0v.003l-.375 1.839a1.5 1.5 0 0 1-1.465 1.858H9a1.5 1.5 0 0 1-1.465-1.859L7.5 15.753Z" />
        </svg>
      ),
      title: "Secure Registration",
      description: "Create your account with advanced security features."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 0V3.75" />
        </svg>
      ),
      title: "Data Protection",
      description: "Your personal information is encrypted and protected."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      ),
      title: "Farmer Support",
      description: "Access tools and resources designed for agricultural success."
    }
  ];

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

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#364641' }}>
      {/* Left Information Section */}
      <div className="w-1/2 flex items-center justify-center  mt-[-5rem]">
        <div className="text-white space-y-8">
          <h1 className="text-5xl font-bold mb-6">Krishi Sahayata</h1>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-6 bg-white bg-opacity-10 p-6 rounded-xl cursor-pointer transition-all duration-300 ${activeFeature === index
                  ? 'scale-105 shadow-lg bg-opacity-20'
                  : 'hover:bg-opacity-15 hover:scale-102'
                  }`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className={`p-3 rounded-full transition-all duration-300 ${activeFeature === index
                  ? 'bg-white bg-opacity-30'
                  : 'bg-transparent'
                  }`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-200 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Signup Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md mt-[-5rem]" >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Farmer's Signup</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <input
              type="text"
              placeholder="Aadhar Card Number"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <button
              onClick={handleSignup}
              className="w-full py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300"
            >
              Signup
            </button>
            {message && (
              <p className="text-center text-sm text-red-600 mt-4">{message}</p>
            )}
            <div className="text-center mt-4">
              <span className="text-gray-600">Already have an account? </span>
              <button
                onClick={() => navigate('/login')}
                className="text-green-700 hover:underline text-sm font-semibold"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;