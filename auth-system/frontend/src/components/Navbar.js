import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout, onLanguageChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");
  const navigate = useNavigate();
  const languageDropdownRef = useRef(null);
  const isAdminPath = window.location.pathname === '/admin';

  const navTexts = [
    "Home",
    "About",
    "Contact",
    "Dashboard",
    "Signup",
    "Login",
    "Logout",
    "Language",
    "କୃଷି ସହାୟକ"
  ];

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
    { key: "te", label: "Telugu (తెలుగు)" },
  ];

  useEffect(() => {
    const fetchTranslations = async () => {
      console.log("Fetching translations for language:", selectedLanguage);
      setLoading(true);

      const translationPromises = navTexts.map(async (text) => {
        try {
          console.log(`Requesting: ${text} in ${selectedLanguage}`);
          const response = await axios.post("http://localhost:5000/api/translate", {
            en: text,
            langCode: selectedLanguage,
          });
          console.log(`Response for ${text}:`, response.data);
          return { [text]: response.data.translation };
        } catch (error) {
          console.error(`Error fetching translation for ${text}:`, error.message);
          console.log(`Error details for ${text}:`, error.response ? error.response.data : error);
          return { [text]: text };
        }
      });

      try {
        const results = await Promise.all(translationPromises);
        console.log("Results array:", results);
        const translationMap = Object.assign({}, ...results);
        console.log("Translation map before set:", translationMap);
        setTranslations((prev) => {
          console.log("Previous translations:", prev);
          console.log("New translation map:", translationMap);
          return translationMap;
        });
      } catch (error) {
        console.error("Unexpected error in Promise.all:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [selectedLanguage]);

  useEffect(() => {
    console.log("Translations state updated:", translations);
  }, [translations]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target) &&
        isLanguageDropdownOpen
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  const getTranslatedText = (englishText) => {
    console.log("Current translations state:", translations);
    const translated = translations[englishText] || englishText;
    console.log(`Translating ${englishText} to: ${translated}`);
    return translated;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageSelect = (languageKey) => {
    console.log("Language selected:", languageKey);
    localStorage.setItem('selectedLanguage', languageKey);
    setSelectedLanguage(languageKey);
    setIsLanguageDropdownOpen(false);
    if (onLanguageChange) {
      onLanguageChange(languageKey);
    }
    window.location.reload();
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      onLogout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  if (loading) {
    return <div style={{ backgroundColor: '#25312d', height: '72px' }}></div>;
  }

  return (
    <nav key={selectedLanguage} style={{ backgroundColor: '#25312d' }} className="navbar relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-4xl font-semibold whitespace-nowrap mt-2 text-white">
            {getTranslatedText("କୃଷି ସହାୟକ")}
          </span>
        </Link>

        <div className="md:hidden flex items-center space-x-4">
          <div className="relative" ref={languageDropdownRef}>
            <button onClick={toggleLanguageDropdown} className="text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                <ul>
                  {languages.map((lang) => (
                    <li key={lang.key} onClick={() => handleLanguageSelect(lang.key)} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      {lang.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:w-auto`} id="navbar-dropdown">
          {!isAdminPath && (
            <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 md:mt-0 space-y-3 md:space-y-0 md:space-x-4">
              <li><Link to="/home" className="block py-2 px-3 text-white rounded hover:bg-gray-700">{getTranslatedText("Home")}</Link></li>
              <li><Link to="/about" className="block py-2 px-3 text-white rounded hover:bg-gray-700">{getTranslatedText("About")}</Link></li>
              <li><Link to="/contact" className="block py-2 px-3 text-white rounded hover:bg-gray-700">{getTranslatedText("Contact")}</Link></li>
              {isAuthenticated && (
                <>
                  <li><Link to="/dashboard" className="block py-2 px-3 text-white rounded hover:bg-gray-700">{getTranslatedText("Dashboard")}</Link></li>
                  <li className="relative hidden md:block" ref={languageDropdownRef}>
                    <button onClick={toggleLanguageDropdown} className="text-white py-2 px-3 rounded hover:bg-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      {getTranslatedText("Language")}
                    </button>
                    {isLanguageDropdownOpen && (
                      <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 w-64">
                        <div className="max-h-48 overflow-y-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
                          {languages.map((lang) => (
                            <button key={lang.key} onClick={() => handleLanguageSelect(lang.key)} className="px-4 py-2 text-left hover:bg-gray-200 cursor-pointer">
                              {lang.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <li><Link to="/signup" className="block py-2 px-3 text-white rounded hover:bg-gray-700">{getTranslatedText("Signup")}</Link></li>
              )}
              <li>

                <button
                  onClick={handleAuthAction}
                  className="text-white py-2 px-4 rounded-md"
                  style={{ backgroundColor: '#7A9578' }}
                >
                  {isAuthenticated ? getTranslatedText("Logout") : getTranslatedText("Login")}
                </button>

              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;