import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle login or logout based on isAuthenticated
  const handleAuthAction = () => {
    if (isAuthenticated) {
      onLogout(); // Call the logout function passed as a prop
      navigate('/login'); // Redirect to login page after logging out
    } else {
      navigate('/login'); // Navigate to login if not authenticated
    }
  };

  return (
    <nav style={{ backgroundColor: '#25312d' }} className="navbar">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand Name */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-4xl font-semibold whitespace-nowrap mt-2 text-white">
            କୃଷି ସହାୟକ
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {/* Mobile Menu Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 md:mt-0 space-y-3 md:space-y-0 md:space-x-4">
            {/* Home, About, Contact Links */}
            <li>
              <Link to="/home" className="block py-2 px-3 text-white rounded hover:bg-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 px-3 text-white rounded hover:bg-gray-700">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 text-white rounded hover:bg-gray-700">
                Contact
              </Link>
            </li>

            {/* Private Links - Only for Authenticated Users */}
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/dashboard" className="block py-2 px-3 text-white rounded hover:bg-gray-700">
                    Dashboard
                  </Link>
                </li>
              </>
            )}

            {/* Authentication Links */}
            {!isAuthenticated && (
              <li>
                <Link to="/signup" className="block py-2 px-3 text-white rounded hover:bg-gray-700">
                  Signup
                </Link>
              </li>
            )}

            {/* Login/Logout Button */}
            <li>
              <button
                onClick={handleAuthAction}
                className="text-white py-2 px-4 rounded-md"
                style={{ backgroundColor: '#7A9578' }}
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
