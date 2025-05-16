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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
        </svg>
      ),
      title: "Weather Insights",
      description: "Get real-time weather forecasts tailored to your agricultural needs."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a9.769 9.769 0 0 0-3.342-6.604l-1.244-1.26a1.125 1.125 0 0 0-1.667.018L3 12M4.5 4.125c0 .621.504 1.125 1.125 1.125H9.75v3.026a.75.75 0 0 1-.214.545l-3.483 3.483a1.5 1.5 0 0 0-.443 1.073v2.025" />
        </svg>
      ),
      title: "Crop Management",
      description: "Optimize your farming strategies with data-driven recommendations."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
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
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: '#364641' }}>
      {/* Left Information Section - Hidden on small screens, shown on medium and up */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-6 lg:p-12 bg-opacity-50 backdrop-blur-sm">
        <div className="text-white space-y-6 lg:space-y-8">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">Krishi Sahayata</h1>
          <div className="space-y-3 lg:space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 lg:space-x-6 bg-white bg-opacity-10 p-4 lg:p-6 rounded-xl cursor-pointer transition-all duration-300 ${activeFeature === index
                  ? 'scale-105 shadow-lg bg-opacity-20'
                  : 'hover:bg-opacity-15 hover:scale-102'
                  }`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className={`p-2 lg:p-3 rounded-full transition-all duration-300 ${activeFeature === index
                  ? 'bg-white bg-opacity-30'
                  : 'bg-transparent'
                  }`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-1 lg:mb-2">{feature.title}</h3>
                  <p className="text-gray-200 text-xs lg:text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Login Form Section - Full width on mobile, half on larger screens */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-sm sm:max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">User Login</h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
              <input
                id="aadhar"
                type="text"
                placeholder="Enter Aadhar Number"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-2 sm:py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300 text-sm sm:text-base"
            >
              Login
            </button>
            {message && (
              <p className={`text-center text-sm mt-3 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <div className="text-center mt-3 sm:mt-4">
              <span className="text-gray-600 text-sm">Don't have an account? </span>
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

      {/* Mobile Features Section - Only shown on small screens */}
      <div className="md:hidden p-6 bg-white bg-opacity-10 rounded-lg mx-4 my-4">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Our Features</h2>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-white bg-opacity-15 p-4 rounded-lg"
            >
              <div className="p-2 rounded-full bg-white bg-opacity-20">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-gray-200 text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;