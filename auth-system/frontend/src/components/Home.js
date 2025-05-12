import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FeatureCard.css";
import Footer from "./Footer";
import QuickAnimatedLoader from "./CustomLoader";


const FeatureCard = () => {
  const navigate = useNavigate();
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";

  const cardTitles = [
    "Insurance Premium Calculator",
    "Apply for Crop Insurance",
    "Report Crop Loss",
    "Check Application Status",
    "Video Tutorial",
    "Admin Login",
  ];

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        const translationPromises = cardTitles.map(async (title) => {
            const response = await axios.post(`${process.env.REACT_APP_AVK_ENDPOINT}/api/translate`, {
            en: title,
            langCode: selectedLanguage,
            });
          return { [title]: response.data.translation };
        });
        const results = await Promise.all(translationPromises);
        const translationMap = Object.assign({}, ...results);
        setTranslations(translationMap);
      } catch (error) {
        console.error("Error fetching translations:", error);
        // Fallback to English titles if API fails
        const fallbackTranslations = {};
        cardTitles.forEach((title) => {
          fallbackTranslations[title] = title;
        });
        setTranslations(fallbackTranslations);
      } finally {
        setLoading(false);
      }
    };
    fetchTranslations();
  }, [selectedLanguage]);

  const getTranslatedText = (englishText) => {
    return translations[englishText] || englishText;
  };

  if (loading) {
    return (
      <QuickAnimatedLoader />
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardTitles.map((title) => (
          <Card
          key={title}
          title={getTranslatedText(title)}
          imageSrc={`/assets/${getImageFileName(title)}.png`}
          href={title === "Check Application Status" ? "/status" : null}
          onClick={
            title !== "Check Application Status" && title !== "Admin Login"
              ? () => navigate(`/${getNavigationPath(title)}`)
              : null
          }
          href2={title === "Admin Login" ? "/adminlogin" : null}
        />
        
        ))}
      </div>

      {/* Footer component added here */}
      <Footer />
    </>
  );

};

const getImageFileName = (title) => {
  const map = {
    "Check Application Status": "farmer",
    "Report Crop Loss": "complaint",
    "Video Tutorial": "video-tutorials",
    "Admin Login": "admin-login",
    "Insurance Premium Calculator": "calculator",
    "Apply for Crop Insurance": "crop-insurance",
  };
  return map[title];
};

// Helper function to get navigation path based on title
const getNavigationPath = (title) => {
  const map = {
    "Report Crop Loss": "complain",
    "Video Tutorial": "video",
    "Insurance Premium Calculator": "calculator",
    "Apply for Crop Insurance": "apply",
  };
  return map[title];
};

const Card = ({ title, imageSrc, href, href2, onClick }) => {
  const actualHref = href || href2;

  return (
    <a
      href={actualHref}
      onClick={onClick}
      className="group relative block w-full h-48 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
    >
      <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-0 transition-opacity duration-300 z-10"></div>

      <div className="absolute inset-0 overflow-hidden">
        <img
          className="h-full w-full object-contain object-center p-2 transition-transform duration-500 group-hover:scale-105"
          src={imageSrc}
          alt={title}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-60 text-white z-20">
        <h2 className="text-base font-semibold leading-tight">{title}</h2>
      </div>

      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white bg-opacity-70 flex items-center justify-center z-20 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

    </a>
  );
};

export default FeatureCard;