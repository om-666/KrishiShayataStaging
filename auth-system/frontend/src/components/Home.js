import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FeatureCard.css";

const FeatureCard = () => {
  const navigate = useNavigate();
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const selectedLanguage = localStorage.getItem("selectedLanguage") || "en"; // Get language code from localStorage

  const cardTitles = [
    "Check Application Status",
    "Report Crop Loss",
    "Video Tutorial",
    "Krishi Mitra",
    "Admin Login",
    "Insurance Premium Calculator",
    "Apply for Crop Insurance",
  ];

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        const translationPromises = cardTitles.map(async (title) => {
          const response = await axios.post("http://localhost:5000/api/translate", {
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
  }, [selectedLanguage]); // Refetch when selectedLanguage changes

  const getTranslatedText = (englishText) => {
    return translations[englishText] || englishText;
  };

  if (loading) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className="container">
      <Card
        title={getTranslatedText("Check Application Status")}
        imageSrc="/assets/farmer.png"
        href="http://localhost:3000/"
      />
      <Card
        title={getTranslatedText("Report Crop Loss")}
        imageSrc="/assets/complaint.png"
        onClick={() => navigate("/complain")}
      />
      <Card
        title={getTranslatedText("Video Tutorial")}
        imageSrc="/assets/video-tutorials.png"
        onClick={() => navigate("/video")}
      />
      <Card
        title={getTranslatedText("Krishi Mitra")}
        imageSrc="/assets/krishi-mitra.png"
        href="https://om-666.github.io/BOT/"
      />
      <Card
        title={getTranslatedText("Admin Login")}
        imageSrc="/assets/admin-login.png"
        href="http://localhost:3000/admin/login"
      />
      <Card
        title={getTranslatedText("Insurance Premium Calculator")}
        imageSrc="/assets/calculator.png"
        onClick={() => navigate("/calculator")}
      />
      <Card
        title={getTranslatedText("Apply for Crop Insurance")}
        imageSrc="/assets/crop-insurance.png"
        onClick={() => navigate("/apply")}
      />
    </div>
  );
};

const Card = ({ title, imageSrc, href, onClick }) => (
  <a href={href} className="card" onClick={onClick}>
    <div className="card-container">
      <img className="card-image" src={imageSrc} alt="" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  </a>
);

export default FeatureCard;