import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

const videos = [
  {
    id: 'W3P9deLFkk8',
    title: 'AGRICULTURE IN INDIA - Documentary',
    language: 'en',
  },
  {
    id: 'gSatxK56H4E',
    title: 'Drones in Agriculture | Narendra Singh Tomar',
    language: 'hi',
  },
  {
    id: 'wEWraMWOaiU',
    title: 'Multi Purpose Chaff Cutter Machine',
    language: 'hi',
  },
  {
    id: 'wEWraMWOaiU',
    title: 'Multi Purpose Chaff Cutter Machine',
    language: 'or',
  },
  {
    id: 'sScXL-ItAiw',
    title: 'Mother India Farms Tackles Water Scarcity',
    language: 'en',
  },
  {
    id: 'e-XvBVZjqNQ',
    title: 'AI in Agriculture - Future of Farming',
    language: 'hi',
  },
  {
    id: 'Q43iauE6ixY',
    title: 'Agriculture in Uttar Pradesh, India',
    language: 'hi',
  },
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

// Text content for different languages
const content = {
  en: {
    title: "Agricultural Video Resources",
    subtitle: "Explore the latest agricultural techniques, equipment, and regional innovations",
    allVideos: "All Videos",
    watchOnYoutube: "Watch on YouTube",
    languageLabels: {
      en: "English",
      hi: "Hindi",
      as: "Assamese",
      bn: "Bangla",
      gu: "Gujarati",
      kn: "Kannada",
      ml: "Malayalam",
      mr: "Marathi",
      or: "Odia",
      pa: "Punjabi",
      ta: "Tamil",
      te: "Telugu"
    }
  },
  hi: {
    title: "कृषि वीडियो संसाधन",
    subtitle: "नवीनतम कृषि तकनीक, उपकरण और क्षेत्रीय नवाचारों का अन्वेषण करें",
    allVideos: "सभी वीडियो",
    watchOnYoutube: "YouTube पर देखें",
    languageLabels: {
      en: "अंग्रेज़ी",
      hi: "हिंदी",
      as: "असमिया",
      bn: "बांग्ला",
      gu: "गुजराती",
      kn: "कन्नड़",
      ml: "मलयालम",
      mr: "मराठी",
      or: "ओडिया",
      pa: "पंजाबी",
      ta: "तमिल",
      te: "तेलुगू"
    }
  },
  as: {
    title: "কৃষি ভিডিঅ' সম্পদ",
    subtitle: "সৰ্বশেষ কৃষি পদ্ধতি, সঁজুলি আৰু আঞ্চলিক অভিনৱতা অন্বেষণ কৰক",
    allVideos: "সকলো ভিডিঅ'",
    watchOnYoutube: "YouTube-ত চাওক",
    languageLabels: {
      en: "ইংৰাজী",
      hi: "হিন্দী",
      as: "অসমীয়া",
      bn: "বাংলা",
      gu: "গুজৰাটী",
      kn: "কন্নড়",
      ml: "মলয়ালম",
      mr: "মাৰাঠী",
      or: "ওড়িয়া",
      pa: "পঞ্জাবী",
      ta: "তামিল",
      te: "তেলেগু"
    }
  },
  bn: {
    title: "কৃষি ভিডিও সম্পদ",
    subtitle: "সর্বশেষ কৃষি প্রযুক্তি, সরঞ্জাম এবং আঞ্চলিক উদ্ভাবনগুলি অন্বেষণ করুন",
    allVideos: "সমস্ত ভিডিও",
    watchOnYoutube: "YouTube-এ দেখুন",
    languageLabels: {
      en: "ইংরেজি",
      hi: "হিন্দি",
      as: "অসমীয়া",
      bn: "বাংলা",
      gu: "গুজরাটি",
      kn: "কন্নড়",
      ml: "মালয়ালম",
      mr: "মারাঠি",
      or: "ওড়িয়া",
      pa: "পাঞ্জাবি",
      ta: "তামিল",
      te: "তেলুগু"
    }
  },
  gu: {
    title: "કૃષિ વિડિયો સંસાધનો",
    subtitle: "નવીનતમ કૃષિ તકનીકો, સાધનો અને પ્રાદેશિક નવીનતમ પ્રવૃત્તિઓની શોધ કરો",
    allVideos: "બધી વિડિયો",
    watchOnYoutube: "YouTube પર જુઓ",
    languageLabels: {
      en: "અંગ્રેજી",
      hi: "હિંદી",
      as: "આસામી",
      bn: "બંગાળી",
      gu: "ગુજરાતી",
      kn: "કન્નડ",
      ml: "મલયાલમ",
      mr: "મરાઠી",
      or: "ઓડિયા",
      pa: "પંજાબી",
      ta: "તમિલ",
      te: "તેલુગુ"
    }
  },
  kn: {
    title: "ಕೃಷಿ ವೀಡಿಯೊ ಸಂಪನ್ಮೂಲಗಳು",
    subtitle: "ನವೀನ ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ, ಸಲಕರಣೆ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ನಾವೀನ್ಯತೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    allVideos: "ಎಲ್ಲಾ ವೀಡಿಯೊಗಳು",
    watchOnYoutube: "YouTube ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ",
    languageLabels: {
      en: "ಇಂಗ್ಲಿಷ್",
      hi: "ಹಿಂದಿ",
      as: "ಅಸ್ಸಾಮೀಸ್",
      bn: "ಬಂಗಾಳಿ",
      gu: "ಗುಜರಾತಿ",
      kn: "ಕನ್ನಡ",
      ml: "ಮಲಯಾಳಂ",
      mr: "ಮರಾಠಿ",
      or: "ಒಡಿಯಾ",
      pa: "ಪಂಜಾಬಿ",
      ta: "ತಮಿಳು",
      te: "ತೆಲುಗು"
    }
  },
  ml: {
    title: "കാർഷിക വീഡിയോ വിഭവങ്ങൾ",
    subtitle: "ഏറ്റവും പുതിയ കാർഷിക സാങ്കേതികവിദ്യകൾ, ഉപകരണങ്ങൾ, പ്രാദേശിക നൂതന ആശയങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക",
    allVideos: "എല്ലാ വീഡിയോകളും",
    watchOnYoutube: "YouTube-ൽ കാണുക",
    languageLabels: {
      en: "ഇംഗ്ലീഷ്",
      hi: "ഹിന്ദി",
      as: "അസ്സാമീസ്",
      bn: "ബംഗാളി",
      gu: "ഗുജറാത്തി",
      kn: "കന്നഡ",
      ml: "മലയാളം",
      mr: "മറാഠി",
      or: "ഒഡിയ",
      pa: "പഞ്ചാബി",
      ta: "തമിഴ്",
      te: "തെലുങ്ക്"
    }
  },
  mr: {
    title: "कृषी व्हिडिओ संसाधने",
    subtitle: "नवीनतम कृषी तंत्रज्ञान, साधने आणि प्रादेशिक नाविन्ये एक्सप्लोर करा",
    allVideos: "सर्व व्हिडिओ",
    watchOnYoutube: "YouTube वर पहा",
    languageLabels: {
      en: "इंग्रजी",
      hi: "हिंदी",
      as: "आसामी",
      bn: "बंगाली",
      gu: "गुजराती",
      kn: "कन्नड",
      ml: "मल्याळम",
      mr: "मराठी",
      or: "ओडिया",
      pa: "पंजाबी",
      ta: "तमिळ",
      te: "तेलुगू"
    }
  },
  or: {
    title: "କୃଷି ଭିଡିଓ ସମ୍ବଳ",
    subtitle: "ନବୀନତମ କୃଷି ପ୍ରଯୁକ୍ତି, ଉପକରଣ ଏବଂ ଅଞ୍ଚଳୀୟ ନବୀନତା ଅନୁସନ୍ଧାନ କରନ୍ତୁ |",
    allVideos: "ସମସ୍ତ ଭିଡିଓ",
    watchOnYoutube: "YouTube ରେ ଦେଖନ୍ତୁ",
    languageLabels: {
      en: "ଇଂରାଜୀ",
      hi: "ହିନ୍ଦୀ",
      as: "ଆସାମୀ",
      bn: "ବଙ୍ଗାଳୀ",
      gu: "ଗୁଜରାଟୀ",
      kn: "କନ୍ନଡ",
      ml: "ମାଲାୟାଲମ୍",
      mr: "ମରାଠୀ",
      or: "ଓଡିଆ",
      pa: "ପଞ୍ଜାବୀ",
      ta: "ତାମିଲ",
      te: "ତେଲୁଗୁ"
    }
  },
  pa: {
    title: "ਖੇਤੀਬਾੜੀ ਵੀਡੀਓ ਸਰੋਤ",
    subtitle: "ਨਵੀਨਤਮ ਖੇਤੀਬਾੜੀ ਤਕਨੀਕਾਂ, ਉਪਕਰਣਾਂ ਅਤੇ ਖੇਤਰੀ ਨਵੀਨਤਾਵਾਂ ਦੀ ਖੋਜ ਕਰੋ",
    allVideos: "ਸਾਰੇ ਵੀਡੀਓ",
    watchOnYoutube: "YouTube 'ਤੇ ਦੇਖੋ",
    languageLabels: {
      en: "ਅੰਗਰੇਜ਼ੀ",
      hi: "ਹਿੰਦੀ",
      as: "ਅਸਾਮੀ",
      bn: "ਬੰਗਾਲੀ",
      gu: "ਗੁਜਰਾਤੀ",
      kn: "ਕੰਨੜ",
      ml: "ਮਲਿਆਲਮ",
      mr: "ਮਰਾਠੀ",
      or: "ਓਡੀਆ",
      pa: "ਪੰਜਾਬੀ",
      ta: "ਤਮਿਲ",
      te: "ਤੇਲਗੂ"
    }
  },
  ta: {
    title: "விவசாய வீடியோ வளங்கள்",
    subtitle: "சமீபத்திய விவசாய நுட்பங்கள், உபகரணங்கள் மற்றும் பிராந்திய புதுமைகளை ஆராயவும்",
    allVideos: "அனைத்து வீடியோக்களும்",
    watchOnYoutube: "YouTube இல் பார்க்கவும்",
    languageLabels: {
      en: "ஆங்கிலம்",
      hi: "இந்தி",
      as: "அசாமியம்",
      bn: "வங்காளம்",
      gu: "குஜராத்தி",
      kn: "கன்னடம்",
      ml: "மலையாளம்",
      mr: "மராத்தி",
      or: "ஒடியா",
      pa: "பஞ்சாபி",
      ta: "தமிழ்",
      te: "தெலுங்கு"
    }
  },
  te: {
    title: "వ్యవసాయ వీడియో వనరులు",
    subtitle: "తాజా వ్యవసాయ పద్ధతులు, పరికరాలు మరియు ప్రాంతీయ ఆవిష్కరణలను అన్వేషించండి",
    allVideos: "అన్ని వీడియోలు",
    watchOnYoutube: "YouTube లో చూడండి",
    languageLabels: {
      en: "ఇంగ్లీష్",
      hi: "హిందీ",
      as: "ఆసామీస్",
      bn: "బెంగాలీ",
      gu: "గుజరాతీ",
      kn: "కన్నడ",
      ml: "మలయాళం",
      mr: "మరాఠీ",
      or: "ఒడియా",
      pa: "పంజాబీ",
      ta: "తమిళం",
      te: "తెలుగు"
    }
  }
};

const VideoGallery = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Filter videos based on language
  useEffect(() => {
    let results = videos;
    
    if (selectedLanguage !== 'All') {
      results = results.filter(video => video.language === selectedLanguage);
    }
    
    setFilteredVideos(results);
  }, [selectedLanguage]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsFullScreen(true);
  };

  const closeModal = () => {
    setIsFullScreen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  const handleLanguageChange = (langKey) => {
    setSelectedLanguage(langKey);
    localStorage.setItem("selectedLanguage", langKey);
  };

  const currentContent = content[selectedLanguage] || content.en;

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section - Simplified */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentContent.title}</h2>
          <p className="text-green-200 text-lg opacity-90">{currentContent.subtitle}</p>
        </div>
      </div>
      
      {/* Language Filter - Pills instead of dropdown */}
      <div className="max-w-6xl mx-auto pt-6 pb-2 px-6">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              selectedLanguage === 'All' 
                ? 'bg-green-600 text-white shadow-lg ring-2 ring-green-400'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => handleLanguageChange('All')}
          >
            {currentContent.allVideos}
          </button>
          
          {languages.map(lang => (
            <button
              key={lang.key}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                selectedLanguage === lang.key 
                  ? 'bg-green-600 text-white shadow-lg ring-2 ring-green-400'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleLanguageChange(lang.key)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Video Grid - Using YouTube Default Thumbnails */}
      <div className="max-w-6xl mx-auto py-8 px-6">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No videos available for the selected language</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div 
                key={`${video.id}-${video.language}`} 
                className="group rounded-xl overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl cursor-pointer transform transition hover:-translate-y-1"
                onClick={() => handleVideoClick(video)}
              >
                <div className="aspect-video relative">
                  {/* Using YouTube's default thumbnail */}
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all duration-300">
                    <div className="w-16 h-16 flex items-center justify-center bg-green-600 rounded-full opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Language Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      video.language === 'en' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-orange-600 text-white'
                    }`}>
                      {currentContent.languageLabels[video.language] || video.language}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg line-clamp-2 text-white">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Video Modal - Improved */}
      {selectedVideo && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 transition-opacity duration-300 ${isFullScreen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative bg-gray-800 rounded-lg w-full max-w-4xl overflow-hidden border border-gray-700">
            <button 
              className="absolute right-4 top-4 bg-gray-900 bg-opacity-70 rounded-full p-2 text-gray-400 hover:text-white z-10 transition-colors"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium text-white">{selectedVideo.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedVideo.language === 'en' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-orange-600 text-white'
                }`}>
                  {currentContent.languageLabels[selectedVideo.language] || selectedVideo.language}
                </span>
              </div>
              
              <a 
                href={`https://www.youtube.com/watch?v=${selectedVideo.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mt-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{currentContent.watchOnYoutube}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;