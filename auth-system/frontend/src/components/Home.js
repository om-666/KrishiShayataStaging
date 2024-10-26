import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FeatureCard.css"; // Normal CSS styles

const FeatureCard = () => {
  const [isEnglishDisplayed, setIsEnglishDisplayed] = useState(true);
  const navigate = useNavigate();

  const translate = () => {
    setIsEnglishDisplayed(!isEnglishDisplayed);
  };

  const getButtonText = () => (isEnglishDisplayed ? "ଓଡ଼ିଆ" : "English");

  // Define audio elements using paths from the public folder
  const audio1 = new Audio("/assets/check-application-status.mp3");
  const audio2 = new Audio("/assets/crop-loss.mp3");
  const audio3 = new Audio("/assets/krishi-mitra.mp3");
  const audio4 = new Audio("/assets/crop-loss-verification.mp3");
  const audio5 = new Audio("/assets/premium-calculator.mp3");
  const audio6 = new Audio("/assets/apply-insurance.mp3");

  const playAudio = (audio) => {
    audio.play();
  };

  const pauseAudio = (audio) => {
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div>
      <button
        onClick={translate}
        style={{ float: "right", position: "sticky", top: "10px", backgroundColor: "#25312d" }}
        className="button"
      >
        {getButtonText()}
      </button>

      {isEnglishDisplayed ? (
        <div id="English" className="container">
          <Card
            title="Check Application Status"
            imageSrc="/assets/farmer.png"
            onMouseEnter={() => playAudio(audio1)}
            onMouseLeave={() => pauseAudio(audio1)}
            href="http://localhost:3000/"
          />
          <Card
            title="Report Crop Loss"
            imageSrc="/assets/complaint.png"
            onMouseEnter={() => playAudio(audio2)}
            onMouseLeave={() => pauseAudio(audio2)}
            onClick={() => navigate("/complain")}
          />
          <Card
            title="Video Tutorial"
            imageSrc="/assets/video-tutorials.png"
            onMouseEnter={() => playAudio(audio3)}
            onMouseLeave={() => pauseAudio(audio3)}
            onClick={() => navigate("/video")}
          />
          <Card
            title="Krishi Mitra"
            imageSrc="/assets/krishi-mitra.png"
            onMouseEnter={() => playAudio(audio4)}
            onMouseLeave={() => pauseAudio(audio4)}
            href="https://om-666.github.io/BOT/"
          />
          <Card
            title="Admin Login"
            imageSrc="/assets/admin-login.png"
            href="http://localhost:3000/admin/login"
          />
          <Card
            title="Insurance Premium Calculator"
            imageSrc="/assets/calculator.png"
            onMouseEnter={() => playAudio(audio5)}
            onMouseLeave={() => pauseAudio(audio5)}
            href="https://om-666.github.io/krishi-sahayata-premimum-calculator/"
          />
          <Card
            title="Apply for Crop Insurance"
            imageSrc="/assets/crop-insurance.png"
            onMouseEnter={() => playAudio(audio6)}
            onMouseLeave={() => pauseAudio(audio6)}
            onClick={() => navigate("/apply")}
          />
        </div>
      ) : (
        <div id="Odia" className="container">
          <Card
            title="ଆବେଦନ ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ"
            imageSrc="/assets/farmer.png"
            onMouseEnter={() => playAudio(audio1)}
            onMouseLeave={() => pauseAudio(audio1)}
            href="http://localhost:3000/"
          />
          <Card
            title="ଫସଲ କ୍ଷୟକ୍ଷତି ରିପୋର୍ଟ କରନ୍ତୁ"
            imageSrc="/assets/complaint.png"
            onMouseEnter={() => playAudio(audio2)}
            onMouseLeave={() => pauseAudio(audio2)}
            onClick={() => navigate("/complain")}
          />
          <Card
            title="ଭିଡ଼ିଓ ଟ୍ୟୁଟୋରିଆଲ"
            imageSrc="/assets/video-tutorials.png"
            onMouseEnter={() => playAudio(audio3)}
            onMouseLeave={() => pauseAudio(audio3)}
            onClick={() => navigate("/video")}
          />
          <Card
            title="କୃଷି ମିତ୍ର"
            imageSrc="/assets/krishi-mitra.png"
            onMouseEnter={() => playAudio(audio4)}
            onMouseLeave={() => pauseAudio(audio4)}
            href="https://om-666.github.io/BOT/"
          />
          <Card
            title="ଆଡମିନ୍‌ ଲଗଇନ୍‌"
            imageSrc="/assets/admin-login.png"
            href="http://localhost:3000/admin/login"
          />
          <Card
            title="ଇନ୍ସୁରାନ୍ସ ପ୍ରିମିୟମ କାଲକୁଲେଟର"
            imageSrc="/assets/calculator.png"
            onMouseEnter={() => playAudio(audio5)}
            onMouseLeave={() => pauseAudio(audio5)}
            href="https://om-666.github.io/krishi-sahayata-premimum-calculator/"
          />
          <Card
            title="ଫସଲ ବୀମା ପାଇଁ ଆବେଦନ କରନ୍ତୁ"
            imageSrc="/assets/crop-insurance.png"
            onMouseEnter={() => playAudio(audio6)}
            onMouseLeave={() => pauseAudio(audio6)}
            onClick={() => navigate("/apply")}
          />
        </div>
      )}
    </div>
  );
};

const Card = ({ title, imageSrc, href, onMouseEnter, onMouseLeave, onClick }) => (
  <a
    href={href}
    className="card"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    <div className="card-container">
      <img className="card-image" src={imageSrc} alt="" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  </a>
);

export default FeatureCard;
