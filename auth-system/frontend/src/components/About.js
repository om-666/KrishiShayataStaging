import React, { useState, useEffect } from 'react';
import axios from "axios";
import './AboutPage.css'; // Ensure you create this CSS file to style the component
import Footer from './Footer';
import QuickAnimatedLoader from "./CustomLoader";

const AboutPage = () => {
  const [translations, setTranslations] = useState({});
  const [loadingTranslations, setLoadingTranslations] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");

  // Texts to translate
  const textsToTranslate = [
    "Our Mission",
    "At Krishi Sahayata, our mission is to revolutionize crop insurance through innovation and technology. We understand the challenges faced by farmers and the government alike, and our solution aims to bridge the gap by providing a comprehensive platform for seamless crop insurance services.",
    "Our Solution",
    "Crop Insurance is an integrated IT solution and a web-based ecosystem designed to streamline service delivery, unify fragmented databases, and eliminate manual processes. Our platform offers features such as:",
    "Local-language support for enhanced accessibility",
    "SMS notifications and helpline support for farmers",
    "Verification of claims using meteorological data",
    "Transparent administration through Aadhar integration",
    "Guidance on insurance policies and video tutorials for farmer awareness",
    "About Us",
    "We are a group of passionate 3rd-year students at Siksha 'O' Anusandhan University, driven by our shared love for technology and our commitment to solving real-world problems.",
    "Sudiksha",
    "OTP",
    "Sumit",
    "Smriti",
    "Chanchal",
  ];

  // Fetch translations on language change
  useEffect(() => {
    const fetchTranslations = async () => {
      console.log("Fetching translations for language:", selectedLanguage);
      setLoadingTranslations(true);

      const translationPromises = textsToTranslate.map(async (text) => {
        try {
          const response = await axios.post("http://localhost:5000/api/translate", {
            en: text,
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
    return translations[englishText] || englishText;
  };

  if (loadingTranslations) {
    <QuickAnimatedLoader />
  }

  return (
    <>
      <div className="container">
        <div className="content">
          <div id="English">
            <div className="section">
              <div className="text-section">
                <h1 className="heading">{getTranslatedText("Our Mission")}</h1>
                <p className="paragraph">
                  {getTranslatedText("At Krishi Sahayata, our mission is to revolutionize crop insurance through innovation and technology. We understand the challenges faced by farmers and the government alike, and our solution aims to bridge the gap by providing a comprehensive platform for seamless crop insurance services.")}
                </p>
                <h1 className="heading">{getTranslatedText("Our Solution")}</h1>
                <p className="paragraph">
                  {getTranslatedText("Crop Insurance is an integrated IT solution and a web-based ecosystem designed to streamline service delivery, unify fragmented databases, and eliminate manual processes. Our platform offers features such as:")}
                </p>
                <ul className="feature-list">
                  <li>{getTranslatedText("Local-language support for enhanced accessibility")}</li>
                  <li>{getTranslatedText("SMS notifications and helpline support for farmers")}</li>
                  <li>{getTranslatedText("Verification of claims using meteorological data")}</li>
                  <li>{getTranslatedText("Transparent administration through Aadhar integration")}</li>
                  <li>{getTranslatedText("Guidance on insurance policies and video tutorials for farmer awareness")}</li>
                </ul>
              </div>
              <div className="image-section">
                <img className="main-image" src="./assets/pexels-pixabay-235731.jpg" alt="A group of People" />
              </div>
            </div>

            <div className="section about-us">
              <div className="text-section">
                <h1 className="heading">{getTranslatedText("About Us")}</h1>
                <p className="paragraph">
                  {getTranslatedText("We are a group of passionate 3rd-year students at Siksha 'O' Anusandhan University, driven by our shared love for technology and our commitment to solving real-world problems.")}
                </p>
              </div>
              {/* <div className="team-section">
                <div className="team-grid">
                  {['Sudiksha', 'OTP', 'Sumit', 'Smriti', 'Chanchal'].map((name, index) => (
                    <div key={index} className="team-member">
                      <img className="team-image" src={`./assets/${name.toLowerCase()}.jpg`} alt={`${name}`}
                        onError={(e) => {
                          e.target.src = './assets/placeholder.jpg'; // Fallback image if loading fails
                        }} />
                      <p className="team-name">{getTranslatedText(name)}</p>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default AboutPage;