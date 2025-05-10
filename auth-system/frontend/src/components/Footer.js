import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  const [translations, setTranslations] = useState({});
  const [loadingTranslations, setLoadingTranslations] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");

  // Texts to translate
  const textsToTranslate = [
    "କୃଷି ସହାୟକ", // Krishi Sahayak in Odia
    "Resources",
    "Follow us",
    "© 2024 Krishi Sahayta. All rights reserved. | Privacy Policy | Terms of Service | Contact Us",
    "Privacy Policy",
    "Terms of Service",
    "Contact Us",
  ];

  // Fetch translations on language change
  useEffect(() => {
    const fetchTranslations = async () => {
      console.log("Fetching translations for language:", selectedLanguage);
      setLoadingTranslations(true);

      const translationPromises = textsToTranslate.map(async (text) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_AVK_ENDPOINT}/api/translate`, {
            en: text === "କୃଷି ସହାୟକ" ? "Krishi Sahayak" : text, // Translate from English equivalent if Odia
            langCode: selectedLanguage,
            });
          console.log(`Response for ${text}:`, response.data);
          return { [text]: response.data.translation };
        } catch (error) {
          console.error(`Error fetching translation for ${text}:`, error.message);
          return { [text]: text }; // Fallback to original text
        }
      });

      try {
        const results = await Promise.all(translationPromises);
        const translationMap = Object.assign({}, ...results);
        console.log("Translation map:", translationMap);
        setTranslations(translationMap);
      } catch (error) {
        console.error("Unexpected error in Promise.all:", error);
        const fallbackTranslations = {};
        textsToTranslate.forEach((text) => {
          fallbackTranslations[text] = text;
        });
        setTranslations(fallbackTranslations);
      } finally {
        setLoadingTranslations(false);
      }
    };

    fetchTranslations();

    // Listen for language changes from Navbar
    const handleStorageChange = (e) => {
      if (e.key === "selectedLanguage") {
        setSelectedLanguage(e.newValue || "en");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [selectedLanguage]);

  const getTranslatedText = (englishText) => {
    return loadingTranslations ? <Spin size="small" /> : translations[englishText] || englishText;
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-flex">
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <span className="footer-title">{getTranslatedText("କୃଷି ସହାୟକ")}</span>
            </a>
          </div>
          <div className="footer-links">
            <div>
              <h2 className="footer-heading">{getTranslatedText("Resources")}</h2>
              <ul className="footer-list">
                {/* Add resource links here */}
              </ul>
            </div>
            <div>
              <h2 className="footer-heading">{getTranslatedText("Follow us")}</h2>
              <ul className="footer-list">
                {/* Add social media links here */}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">{getTranslatedText("© 2024 Krishi Sahayta. All rights reserved. | Privacy Policy | Terms of Service | Contact Us")}</div>
      </div>
    </footer>
  );
};

export default Footer;
