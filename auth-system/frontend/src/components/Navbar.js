import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout, onLanguageChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Language options
  const languages = [
    { key: "en", label: "English" },
    { key: "hi", label: "Hindi (हिन्दी)" },
    { key: "as", label: "Assamese (অসমীয়া)" },
    { key: "bn", label: "Bangla (বাংলা)" },
    { key: "gu", label: "Gujarati (ગુજરાતી)" },
    { key: "kn", label: "Kannada (ಕನ್ನಡ)" },
    { key: "ml", label: "Malayalam (മലയാളം)" },
    { key: "mr", label: "Marathi (मराठी)" },
    { key: "or", label: "Odia (ଓଡ଼ିଆ)" },
    { key: "pa", label: "Punjabi (ਪੰਜਾਬੀ)" },
    { key: "ta", label: "Tamil (தமிழ்)" },
    { key: "te", label: "Telugu (తెലുগు)" }
  ];

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsLanguageDropdownOpen(false);
  };

  // Function to toggle language dropdown
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsMobileMenuOpen(false);
  };

  // Handle language selection
  const handleLanguageSelect = (languageKey) => {
    onLanguageChange(languageKey);
    setIsLanguageDropdownOpen(false);
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
    <nav style={{ backgroundColor: '#25312d' }} className="navbar relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand Name */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-4xl font-semibold whitespace-nowrap mt-2 text-white">
            କୃଷି ସହାୟକ
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Language Dropdown for Mobile */}
          <div className="relative">
            <button
              onClick={toggleLanguageDropdown}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                <ul>
                  {languages.map((lang) => (
                    <li
                      key={lang.key}
                      onClick={() => handleLanguageSelect(lang.key)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {lang.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
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
          className={`${isMobileMenuOpen ? 'block' : 'hidden'
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
                <li className="relative hidden md:block">
                  <button
                    onClick={toggleLanguageDropdown}
                    className="text-white py-2 px-3 rounded hover:bg-gray-700 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                    Language
                  </button>
                  {isLanguageDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 w-64">
                      <div
                        className="max-h-48 overflow-y-auto"
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.key}
                            onClick={() => handleLanguageSelect(lang.key)}
                            className="px-4 py-2 text-left hover:bg-gray-200 cursor-pointer"
                          >
                            {lang.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
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