import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImageUrl from '../Images/farmer.webp';

function Login({ onLoginSuccess }) {
  const [aadhar, setAadhar] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [activeFeature, setActiveFeature] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
        </svg>
      ),
      title: "Weather Insights",
      description: "Get real-time weather forecasts tailored to your agricultural needs."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a9.769 9.769 0 0 0-3.342-6.604l-1.244-1.26a1.125 1.125 0 0 0-1.667.018L3 12M4.5 4.125c0 .621.504 1.125 1.125 1.125H9.75v3.026a.75.75 0 0 1-.214.545l-3.483 3.483a1.5 1.5 0 0 0-.443 1.073v2.025" />
        </svg>
      ),
      title: "Crop Management",
      description: "Optimize your farming strategies with data-driven recommendations."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.012.09 2.02.226 3.026.405.533.09.97.404.97.946v3.094c0 .472-.253.917-.673 1.187a5.961 5.961 0 0 1-2.621.643 5.965 5.965 0 0 1-2.621-.643 3.75 3.75 0 0 0-1.355-.248c-.994 0-1.887.685-2.08 1.677l-.54 3.019A3.678 3.678 0 0 0 9.15 17.25h5.7a3.678 3.678 0 0 0 3.6-3.019l.54-3.019a2.077 2.077 0 0 0-2.08-1.677 5.965 5.965 0 0 1-2.621.643 5.965 5.965 0 0 1-2.621-.643 3.75 3.75 0 0 0-1.355-.248 3.755 3.755 0 0 0-3.638 3.019Z" />
        </svg>
      ),
      title: "Resource Guidance",
      description: "Maximize productivity with intelligent resource allocation insights."
    }
  ];

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_AVK_ENDPOINT}/api/auth/login`, { aadhar, password });

      console.log("Full API Response:", response.data);

      if (response.status === 200 && response.data.aadhar) {
        setMessage('Login successful!');
        localStorage.setItem('userAadhar', response.data.aadhar);
        console.log("Aadhar Card Response:", response.data.aadhar);
        onLoginSuccess();
        navigate('/home');
      } else {
        setMessage('Invalid Aadhar number or password.');
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#364641' }}>
      {/* Left Information Section */}
      <div className="w-1/2 flex items-center justify-center p-12 bg-opacity-50 backdrop-blur-sm">
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

      {/* Right Login Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-white p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">User Login</h2>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Aadhar Number"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
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
              onClick={handleLogin}
              className="w-full py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300"
            >
              Login
            </button>
            {message && (
              <p className="text-center text-sm text-red-600 mt-4">{message}</p>
            )}
            <div className="text-center mt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={navigateToSignup}
                className="text-green-700 hover:underline text-sm font-semibold"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;