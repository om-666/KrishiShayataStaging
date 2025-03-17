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
            href="http://localhost:3000/admin/"
          />
          <Card
            title="Insurance Premium Calculator"
            imageSrc="/assets/calculator.png"
            onMouseEnter={() => playAudio(audio5)}
            onMouseLeave={() => pauseAudio(audio5)}
            onClick={() => navigate("/calculator")}
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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Globe } from 'lucide-react';

// const FeatureCard = () => {
//   const [isEnglishDisplayed, setIsEnglishDisplayed] = useState(true);
//   const navigate = useNavigate();

//   const translate = () => {
//     setIsEnglishDisplayed(!isEnglishDisplayed);
//   };

//   const getButtonText = () => (isEnglishDisplayed ? "ଓଡ଼ିଆ" : "English");

//   // Audio elements
//   const audio1 = new Audio("/assets/check-application-status.mp3");
//   const audio2 = new Audio("/assets/crop-loss.mp3");
//   const audio3 = new Audio("/assets/krishi-mitra.mp3");
//   const audio4 = new Audio("/assets/crop-loss-verification.mp3");
//   const audio5 = new Audio("/assets/premium-calculator.mp3");
//   const audio6 = new Audio("/assets/apply-insurance.mp3");

//   const playAudio = (audio) => audio.play();
//   const pauseAudio = (audio) => {
//     audio.pause();
//     audio.currentTime = 0;
//   };

//   const cards = [
//     {
//       enTitle: "Check Application Status",
//       odTitle: "ଆବେଦନ ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ",
//       imageSrc: "/assets/farmer.png",
//       href: "http://localhost:3000/",
//       audio: audio1,
//       gradient: "from-emerald-600 to-teal-600"
//     },
//     {
//       enTitle: "Report Crop Loss",
//       odTitle: "ଫସଲ କ୍ଷୟକ୍ଷତି ରିପୋର୍ଟ କରନ୍ତୁ",
//       imageSrc: "/assets/complaint.png",
//       onClick: () => navigate("/complain"),
//       audio: audio2,
//       gradient: "from-red-600 to-orange-600"
//     },
//     {
//       enTitle: "Video Tutorial",
//       odTitle: "ଭିଡ଼ିଓ ଟ୍ୟୁଟୋରିଆଲ",
//       imageSrc: "/assets/video-tutorials.png",
//       onClick: () => navigate("/video"),
//       audio: audio3,
//       gradient: "from-purple-600 to-indigo-600"
//     },
//     {
//       enTitle: "Krishi Mitra",
//       odTitle: "କୃଷି ମିତ୍ର",
//       imageSrc: "/assets/krishi-mitra.png",
//       href: "https://om-666.github.io/BOT/",
//       audio: audio4,
//       gradient: "from-green-600 to-lime-600"
//     },
//     {
//       enTitle: "Admin Login",
//       odTitle: "ଆଡମିନ୍‌ ଲଗଇନ୍‌",
//       imageSrc: "/assets/admin-login.png",
//       href: "http://localhost:3000/admin/login",
//       gradient: "from-gray-600 to-gray-800"
//     },
//     {
//       enTitle: "Insurance Premium Calculator",
//       odTitle: "ଇନ୍ସୁରାନ୍ସ ପ୍ରିମିୟମ କାଲକୁଲେଟର",
//       imageSrc: "/assets/calculator.png",
//       href: "https://om-666.github.io/krishi-sahayata-premimum-calculator/",
//       audio: audio5,
//       gradient: "from-blue-600 to-cyan-600"
//     },
//     {
//       enTitle: "Apply for Crop Insurance",
//       odTitle: "ଫସଲ ବୀମା ପାଇଁ ଆବେଦନ କରନ୍ତୁ",
//       imageSrc: "/assets/crop-insurance.png",
//       onClick: () => navigate("/apply"),
//       audio: audio6,
//       gradient: "from-teal-600 to-emerald-600"
//     }
//   ];

//   return (
//     <div className="min-h-screen w-full bg-gray-900 overflow-hidden relative">
//       {/* Language Toggle */}
//       <button
//         onClick={translate}
//         className="fixed top-4 right-4 z-50 group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
//       >
//         <Globe className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
//         <span className="font-semibold">{getButtonText()}</span>
//       </button>

//       {/* Cards Container */}
//       <div className="max-w-7xl mx-auto p-6 pt-20">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cards.map((card, index) => (
//             <div
//               key={card.enTitle}
//               className={`group relative bg-gradient-to-br ${card.gradient} rounded-2xl shadow-2xl border border-white/10 hover:border-white/30 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,162,0.5)] animate-slideUp`}
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <a
//                 href={card.href}
//                 onClick={card.onClick}
//                 onMouseEnter={card.audio ? () => playAudio(card.audio) : undefined}
//                 onMouseLeave={card.audio ? () => pauseAudio(card.audio) : undefined}
//                 className="block p-6 relative z-10"
//               >
//                 <div className="relative">
//                   <img
//                     src={card.imageSrc}
//                     alt={card.enTitle}
//                     className="w-full h-48 object-cover rounded-xl mb-4 transform group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <h2 className="text-xl font-bold text-white text-center relative z-10 group-hover:text-emerald-200 transition-colors duration-300 drop-shadow-md">
//                   {isEnglishDisplayed ? card.enTitle : card.odTitle}
//                 </h2>
//               </a>
//               {/* Card Overlay Effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
//               <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Dynamic Background Effects */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000 transform translate-x-1/2 translate-y-1/2"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,162,0.1)_0%,_transparent_70%)] animate-pulse-slow"></div>
//       </div>
//     </div>
//   );
// };

// export default FeatureCard;
