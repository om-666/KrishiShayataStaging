// AboutPage.js
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './AboutPage.css';
import Footer from './Footer';
import QuickAnimatedLoader from "./CustomLoader";
import BlurText from './BlurText';

const AboutPage = () => {
  const [translations, setTranslations] = useState({});
  const [loadingTranslations, setLoadingTranslations] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");

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
    "Sudiksha", "OTP", "Sumit", "Smriti", "Chanchal",
  ];

  useEffect(() => {
    const fetchTranslations = async () => {
      setLoadingTranslations(true);
      const translationPromises = textsToTranslate.map(async (text) => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_AVK_ENDPOINT}/api/translate`, {
            en: text,
            langCode: selectedLanguage,
          });
          return { [text]: response.data.translation };
        } catch {
          return { [text]: text };
        }
      });

      try {
        const results = await Promise.all(translationPromises);
        setTranslations(Object.assign({}, ...results));
      } catch {
        const fallback = {};
        textsToTranslate.forEach((text) => fallback[text] = text);
        setTranslations(fallback);
      } finally {
        setLoadingTranslations(false);
      }
    };

    fetchTranslations();
    const handleStorageChange = (e) => {
      if (e.key === "selectedLanguage") {
        setSelectedLanguage(e.newValue || "en");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [selectedLanguage]);

  const getTranslatedText = (text) => translations[text] || text;

  if (loadingTranslations) return <QuickAnimatedLoader />;

  return (
    <>
      <div className="container">
        <div className="content">
          <div id="English">
            <div className="section">
              <div className="text-section">
                <BlurText className="heading" text={getTranslatedText("Our Mission")} />
                <BlurText className="paragraph" text={getTranslatedText("At Krishi Sahayata, our mission is to revolutionize crop insurance through innovation and technology. We understand the challenges faced by farmers and the government alike, and our solution aims to bridge the gap by providing a comprehensive platform for seamless crop insurance services.")} />

                <BlurText className="heading" text={getTranslatedText("Our Solution")} />
                <BlurText className="paragraph" text={getTranslatedText("Crop Insurance is an integrated IT solution and a web-based ecosystem designed to streamline service delivery, unify fragmented databases, and eliminate manual processes. Our platform offers features such as:")} />

                <ul className="feature-list">
                  {[
                    "Local-language support for enhanced accessibility",
                    "SMS notifications and helpline support for farmers",
                    "Verification of claims using meteorological data",
                    "Transparent administration through Aadhar integration",
                    "Guidance on insurance policies and video tutorials for farmer awareness",
                  ].map((feature, idx) => (
                    <li key={idx}>
                      <BlurText text={getTranslatedText(feature)} animateBy="words" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="image-section">
                <img className="main-image" src="./assets/pexels-pixabay-235731.jpg" alt="A group of People" />
              </div>
            </div>

            <div className="section about-us">
              <div className="text-section">
                <BlurText className="heading" text={getTranslatedText("About Us")} />
                <BlurText className="paragraph" text={getTranslatedText("We are a group of passionate final year students at Siksha 'O' Anusandhan University, driven by our shared love for technology and our commitment to solving real-world problems.")} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
