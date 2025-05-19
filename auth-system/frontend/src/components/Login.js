import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImageUrl from '../Images/farmer.webp';

function Login({ onLoginSuccess }) {
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

  const translations = {
    en: {
      title: "Krishi Sahayata",
      loginHeader: "User Login",
      aadharLabel: "Aadhar Number",
      aadharPlaceholder: "Enter Aadhar Number",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter Password",
      loginButton: "Login",
      noAccount: "Don't have an account?",
      signupLink: "Sign Up",
      featuresHeader: "Our Features",
      features: [
        {
          title: "Weather Insights",
          description: "Get real-time weather forecasts tailored to your agricultural needs."
        },
        {
          title: "Crop Management",
          description: "Optimize your farming strategies with data-driven recommendations."
        },
        {
          title: "Resource Guidance",
          description: "Maximize productivity with intelligent resource allocation insights."
        }
      ]
    },
    hi: {
      title: "कृषि सहायता",
      loginHeader: "उपयोगकर्ता लॉगिन",
      aadharLabel: "आधार नंबर",
      aadharPlaceholder: "आधार नंबर दर्ज करें",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "पासवर्ड दर्ज करें",
      loginButton: "लॉगिन करें",
      noAccount: "खाता नहीं है?",
      signupLink: "साइन अप करें",
      featuresHeader: "हमारी विशेषताएं",
      features: [
        {
          title: "मौसम जानकारी",
          description: "आपकी कृषि आवश्यकताओं के लिए अनुकूलित वास्तविक समय मौसम पूर्वानुमान प्राप्त करें।"
        },
        {
          title: "फसल प्रबंधन",
          description: "डेटा-आधारित सिफारिशों के साथ अपनी खेती रणनीतियों को अनुकूलित करें।"
        },
        {
          title: "संसाधन मार्गदर्शन",
          description: "बुद्धिमान संसाधन आवंटन अंतर्दृष्टि के साथ उत्पादकता को अधिकतम करें।"
        }
      ]
    },
    as: {
      title: "কৃষি সহায়তা",
      loginHeader: "ব্যৱহাৰকাৰী লগইন",
      aadharLabel: "আধাৰ নম্বৰ",
      aadharPlaceholder: "আধাৰ নম্বৰ দিয়ক",
      passwordLabel: "পাছৱৰ্ড",
      passwordPlaceholder: "পাছৱৰ্ড দিয়ক",
      loginButton: "লগইন কৰক",
      noAccount: "একাউণ্ট নাই?",
      signupLink: "চাইন আপ কৰক",
      featuresHeader: "আমাৰ বৈশিষ্ট্যসমূহ",
      features: [
        {
          title: "বতৰৰ তথ্য",
          description: "আপোনাৰ কৃষি প্ৰয়োজনীয়তাৰ বাবে তৈয়াৰ কৰা বাস্তৱ সময়ৰ বতৰৰ পূৰ্বাভাস লাভ কৰক।"
        },
        {
          title: "শস্য পৰিচালনা",
          description: "ডাটা-চালিত পৰামৰ্শৰ সৈতে আপোনাৰ খেতিৰ কৌশলসমূহ অনুকূল কৰক।"
        },
        {
          title: "সম্পদ নিৰ্দেশনা",
          description: "বুদ্ধিমান সম্পদ বিতৰণ তথ্যৰ সৈতে উৎপাদনশীলতা সৰ্বাধিক কৰক।"
        }
      ]
    },
    bn: {
      title: "কৃষি সহায়তা",
      loginHeader: "ব্যবহারকারী লগইন",
      aadharLabel: "আধার নম্বর",
      aadharPlaceholder: "আধার নম্বর প্রবেশ করান",
      passwordLabel: "পাসওয়ার্ড",
      passwordPlaceholder: "পাসওয়ার্ড প্রবেশ করান",
      loginButton: "লগইন করুন",
      noAccount: "অ্যাকাউন্ট নেই?",
      signupLink: "সাইন আপ করুন",
      featuresHeader: "আমাদের বৈশিষ্ট্য",
      features: [
        {
          title: "আবহাওয়ার তথ্য",
          description: "আপনার কৃষি প্রয়োজনের জন্য তৈরি রিয়েল-টাইম আবহাওয়ার পূর্বাভাস পান।"
        },
        {
          title: "ফসল ব্যবস্থাপনা",
          description: "ডেটা-চালিত সুপারিশের মাধ্যমে আপনার চাষের কৌশলগুলি অপ্টিমাইজ করুন।"
        },
        {
          title: "সম্পদ নির্দেশিকা",
          description: "বুদ্ধিমান সম্পদ বরাদ্দের তথ্য দিয়ে উৎপাদনশীলতা সর্বাধিক করুন।"
        }
      ]
    },
    gu: {
      title: "કૃષિ સહાયતા",
      loginHeader: "વપરાશકર્તા લૉગિન",
      aadharLabel: "આધાર નંબર",
      aadharPlaceholder: "આધાર નંબર દાખલ કરો",
      passwordLabel: "પાસવર્ડ",
      passwordPlaceholder: "પાસવર્ડ દાખલ કરો",
      loginButton: "લૉગિન કરો",
      noAccount: "ખાતું નથી?",
      signupLink: "સાઇન અપ કરો",
      featuresHeader: "અમારી સુવિધાઓ",
      features: [
        {
          title: "હવામાન આંતરદૃષ્ટિ",
          description: "તમારી કૃષિ જરૂરિયાતો માટે તૈયાર કરેલ રીઅલ-ટાઇમ હવામાન આગાહીઓ મેળવો."
        },
        {
          title: "પાક વ્યવસ્થાપન",
          description: "ડેટા-આધારિત ભલામણો સાથે તમારી ખેતી વ્યૂહરચનાઓને ઑપ્ટિમાઇઝ કરો."
        },
        {
          title: "સંસાધન માર્ગદર્શન",
          description: "બુદ્ધિશાળી સંસાધન ફાળવણી આંતરદૃષ્ટિ સાથે ઉત્પાદકતાને મહત્તમ કરો."
        }
      ]
    },
    kn: {
      title: "ಕೃಷಿ ಸಹಾಯತ",
      loginHeader: "ಬಳಕೆದಾರ ಲಾಗಿನ್",
      aadharLabel: "ಆಧಾರ್ ಸಂಖ್ಯೆ",
      aadharPlaceholder: "ಆಧಾರ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
      passwordLabel: "ಪಾಸ್‌ವರ್ಡ್",
      passwordPlaceholder: "ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
      loginButton: "ಲಾಗಿನ್ ಮಾಡಿ",
      noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
      signupLink: "ಸೈನ್ ಅಪ್ ಮಾಡಿ",
      featuresHeader: "ನಮ್ಮ ವೈಶಿಷ್ಟ್ಯಗಳು",
      features: [
        {
          title: "ಹವಾಮಾನ ಒಳನೋಟಗಳು",
          description: "ನಿಮ್ಮ ಕೃಷಿ ಅಗತ್ಯಗಳಿಗೆ ತಕ್ಕಂತೆ ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಳನ್ನು ಪಡೆಯಿರಿ."
        },
        {
          title: "ಬೆಳೆ ನಿರ್ವಹಣೆ",
          description: "ಡೇಟಾ-ಆಧಾರಿತ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಕೃಷಿ ತಂತ್ರಗಳನ್ನು ಆಪ್ಟಿಮೈಜ್ ಮಾಡಿ."
        },
        {
          title: "ಸಂಪನ್ಮೂಲ ಮಾರ್ಗದರ್ಶನ",
          description: "ಬುದ್ಧಿವಂತ ಸಂಪನ್ಮೂಲ ಹಂಚಿಕೆ ಒಳನೋಟಗಳೊಂದಿಗೆ ಉತ್ಪಾದಕತೆಯನ್ನು ಗರಿಷ್ಠಗೊಳಿಸಿ."
        }
      ]
    },
    ml: {
      title: "കൃഷി സഹായത",
      loginHeader: "ഉപയോക്തൃ ലോഗിൻ",
      aadharLabel: "ആധാർ നമ്പർ",
      aadharPlaceholder: "ആധാർ നമ്പർ നൽകുക",
      passwordLabel: "പാസ്‌വേഡ്",
      passwordPlaceholder: "പാസ്‌വേഡ് നൽകുക",
      loginButton: "ലോഗിൻ ചെയ്യുക",
      noAccount: "അക്കൗണ്ട് ഇല്ലേ?",
      signupLink: "സൈൻ അപ്പ് ചെയ്യുക",
      featuresHeader: "ഞങ്ങളുടെ സവിശേഷതകൾ",
      features: [
        {
          title: "കാലാവസ്ഥാ വിവരങ്ങൾ",
          description: "നിന്റെ കൃഷി ആവശ്യങ്ങൾക്ക് അനുയോജ്യമായ റിയൽ-ടൈം കാലാവസ്ഥാ പ്രവചനങ്ങൾ നേടുക."
        },
        {
          title: "വിള നിയന്ത്രണം",
          description: "ഡാറ്റാ-അടിസ്ഥാനമാക്കിയ ശുപാർശകളോടെ നിന്റെ കൃഷി തന്ത്രങ്ങൾ ഒപ്റ്റിമൈസ് ചെയ്യുക."
        },
        {
          title: "വിഭവ മാർഗനിർദേശം",
          description: "ബുദ്ധിപരമായ വിഭവ വിന്യാസ വിവരങ്ങളോടെ ഉൽപ്പാദനക്ഷമത പരമാവധി വർദ്ധിപ്പിക്കുക."
        }
      ]
    },
    mr: {
      title: "कृषी सहाय्यता",
      loginHeader: "वापरकर्ता लॉगिन",
      aadharLabel: "आधार क्रमांक",
      aadharPlaceholder: "आधार क्रमांक प्रविष्ट करा",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "पासवर्ड प्रविष्ट करा",
      loginButton: "लॉगिन करा",
      noAccount: "खाते नाही?",
      signupLink: "साइन अप करा",
      featuresHeader: "आमची वैशिष्ट्ये",
      features: [
        {
          title: "हवामान अंतर्दृष्टी",
          description: "तुमच्या कृषी गरजांसाठी तयार केलेली रिअल-टाइम हवामान अंदाज मिळवा."
        },
        {
          title: "पीक व्यवस्थापन",
          description: "डेटा-आधारित शिफारशींसह तुमच्या शेती धोरणांना अनुकूल करा."
        },
        {
          title: "संसाधन मार्गदर्शन",
          description: "बुद्धिमान संसाधन वाटप अंतर्दृष्टींसह उत्पादकता वाढवा."
        }
      ]
    },
    or: {
      title: "କୃଷି ସହାୟତା",
      loginHeader: "ଉପଭୋକ୍ତା ଲଗଇନ",
      aadharLabel: "ଆଧାର ନମ୍ବର",
      aadharPlaceholder: "ଆଧାର ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ",
      passwordLabel: "ପାସୱାର୍ଡ",
      passwordPlaceholder: "ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ",
      loginButton: "ଲଗଇନ କରନ୍ତୁ",
      noAccount: "କୌଣସି ଆକାଉଣ୍ଟ ନାହିଁ?",
      signupLink: "ସାଇନ ଅପ କରନ୍ତୁ",
      featuresHeader: "ଆମର ବୈଶିଷ୍ଟ୍ୟଗୁଡ଼ିକ",
      features: [
        {
          title: "ପାଣିପାଗ ତଥ୍ୟ",
          description: "ଆପଣଙ୍କ କୃଷି ଆବଶ୍ୟକତା ପାଇଁ ତିଆରି ରିଅଲ-ଟାଇମ ପାଣିପାଗ ପୂର୍ବାଭାସ ପାଆନ୍ତୁ।"
        },
        {
          title: "ଶସ୍ୟ ପରିଚାଳନା",
          description: "ଡାଟା-ଆଧାରିତ ପରାମର୍ଶ ସହିତ ଆପଣଙ୍କ ଚାଷ ରଣନୀତିକୁ ଅନୁକୂଳ କରନ୍ତୁ।"
        },
        {
          title: "ସମ୍ବଳ ନିର୍ଦ୍ଦେଶନା",
          description: "ବୁଦ୍ଧିମାନ ସମ୍ବଳ ବଣ୍ଟନ ତଥ୍ୟ ସହିତ ଉତ୍ପାଦନଶୀଳତାକୁ ସର୍ବାଧିକ କରନ୍ତୁ।"
        }
      ]
    },
    pa: {
      title: "ਕ੍ਰਿਸ਼ੀ ਸਹਾਇਤਾ",
      loginHeader: "ਉਪਭੋਗਤਾ ਲੌਗਇਨ",
      aadharLabel: "ਆਧਾਰ ਨੰਬਰ",
      aadharPlaceholder: "ਆਧਾਰ ਨੰਬਰ ਦਰਜ ਕਰੋ",
      passwordLabel: "ਪਾਸਵਰਡ",
      passwordPlaceholder: "ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ",
      loginButton: "ਲੌਗਇਨ ਕਰੋ",
      noAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
      signupLink: "ਸਾਇਨ ਅਪ ਕਰੋ",
      featuresHeader: "ਸਾਡੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
      features: [
        {
          title: "ਮੌਸਮ ਜਾਣਕਾਰੀ",
          description: "ਤੁਹਾਡੀਆਂ ਖੇਤੀਬਾੜੀ ਜ਼ਰੂਰਤਾਂ ਲਈ ਅਨੁਕੂਲਿਤ ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਪੂਰਵਅਨੁਮਾਨ ਪ੍ਰਾਪਤ ਕਰੋ।"
        },
        {
          title: "ਫਸਲ ਪ੍ਰਬੰਧਨ",
          description: "ਡਾਟਾ-ਅਧਾਰਤ ਸਿਫਾਰਸ਼ਾਂ ਨਾਲ ਆਪਣੀਆਂ ਖੇਤੀ ਰਣਨੀਤੀਆਂ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰੋ।"
        },
        {
          title: "ਸਰੋਤ ਮਾਰਗਦਰਸ਼ਨ",
          description: "ਬੁੱਧੀਮਾਨ ਸਰੋਤ ਵੰਡ ਦੀਆਂ ਜਾਣਕਾਰੀਆਂ ਨਾਲ ਉਤਪਾਦਕਤਾ ਨੂੰ ਵੱਧ ਤੋਂ ਵੱਧ ਕਰੋ।"
        }
      ]
    },
    ta: {
      title: "கிருஷி சகாயதா",
      loginHeader: "பயனர் உள்நுழைவு",
      aadharLabel: "ஆதார் எண்",
      aadharPlaceholder: "ஆதார் எண்ணை உள்ளிடவும்",
      passwordLabel: "கடவுச்சொல்",
      passwordPlaceholder: "கடவுச்சொல்லை உள்ளிடவும்",
      loginButton: "உள்நுழைக",
      noAccount: "கணக்கு இல்லையா?",
      signupLink: "பதிவு செய்",
      featuresHeader: "எங்கள் அம்சங்கள்",
      features: [
        {
          title: "வானிலை தகவல்கள்",
          description: "உங்கள் விவசாய தேவைகளுக்கு ஏற்றவாறு நிகழ்நேர வானிலை முன்னறிவிப்புகளைப் பெறுங்கள்."
        },
        {
          title: "பயிர் மேலாண்மை",
          description: "தரவு-அடிப்படையிலான பரிந்துரைகளுடன் உங்கள் விவசாய உத்திகளை மேம்படுத்தவும்."
        },
        {
          title: "வள மார்க்கநெறி",
          description: "புத்திசாலித்தனமான வள ஒதுக்கீடு தகவல்களுடன் உற்பத்தித்திறனை அதிகரிக்கவும்."
        }
      ]
    },
    te: {
      title: "కృషి సహాయత",
      loginHeader: "వినియోగదారు లాగిన్",
      aadharLabel: "ఆధార్ నంబర్",
      aadharPlaceholder: "ఆధార్ నంబర్‌ను నమోదు చేయండి",
      passwordLabel: "పాస్‌వర్డ్",
      passwordPlaceholder: "పాస్‌వర్డ్‌ను నమోదు చేయండి",
      loginButton: "లాగిన్ చేయండి",
      noAccount: "ఖాతా లేదా?",
      signupLink: "సైన్ అప్ చేయండి",
      featuresHeader: "మా లక్షణాలు",
      features: [
        {
          title: "వాతావరణ సమాచారం",
          description: "మీ వ్యవసాయ అవసరాలకు అనుగుణంగా నిజ-సమయ వాతావరణ సూచనలను పొందండి."
        },
        {
          title: "పంట నిర్వహణ",
          description: "డేటా-ఆధారిత సిఫారసులతో మీ వ్యవసాయ వ్యూహాలను ఆప్టిమైజ్ చేయండి."
        },
        {
          title: "వనరుల మార్గదర్శనం",
          description: "బుద్ధివంతమైన వనరుల కేటాయింపు సమాచారంతో ఉత్పాదకతను గరిష్ఠీకరించండి."
        }
      ]
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");
  const [aadhar, setAadhar] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [activeFeature, setActiveFeature] = useState(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const languageDropdownRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }, [selectedLanguage]);

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

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageSelect = (languageKey) => {
    setSelectedLanguage(languageKey);
    setIsLanguageDropdownOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_AVK_ENDPOINT}/api/auth/login`, { aadhar, password });

      if (response.status === 200 && response.data.aadhar) {
        setMessage(translations[selectedLanguage].loginSuccess || 'Login successful!');
        localStorage.setItem('userAadhar', response.data.aadhar);
        onLoginSuccess();
        navigate('/home');
      } else {
        setMessage(translations[selectedLanguage].invalidCredentials || 'Invalid Aadhar number or password.');
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || translations[selectedLanguage].loginError || 'Error logging in');
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: '#364641' }}>
      {/* Left Information Section - Hidden on small screens, shown on medium and up */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-6 lg:p-12 bg-opacity-50 backdrop-blur-sm">
        <div className="text-white space-y-6 lg:space-y-8">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">{translations[selectedLanguage].title}</h1>
          <div className="space-y-3 lg:space-y-4">
            {translations[selectedLanguage].features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 lg:space-x-6 bg-white bg-opacity-10 p-4 lg:p-6 rounded-xl cursor-pointer transition-all duration-300 ${activeFeature === index
                  ? 'scale-105 shadow-lg bg-opacity-20'
                  : 'hover:bg-opacity-15 hover:scale-102'
                  }`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className={`p-2 lg:p-3 rounded-full transition-all duration-300 ${activeFeature === index
                  ? 'bg-white bg-opacity-30'
                  : 'bg-transparent'
                  }`}>
                  {[
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                    </svg>,
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a9.769 9.769 0 0 0-3.342-6.604l-1.244-1.26a1.125 1.125 0 0 0-1.667.018L3 12M4.5 4.125c0 .621.504 1.125 1.125 1.125H9.75v3.026a.75.75 0 0 1-.214.545l-3.483 3.483a1.5 1.5 0 0 0-.443 1.073v2.025" />
                    </svg>,
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.012.09 2.02.226 3.026.405.533.09.97.404.97.946v3.094c0 .472-.253.917-.673 1.187a5.961 5.961 0 0 1-2.621.643 5.965 5.965 0 0 1-2.621-.643 3.75 3.75 0 0 0-1.355-.248c-.994 0-1.887.685-2.08 1.677l-.54 3.019A3.678 3.678 0 0 0 9.15 17.25h5.7a3.678 3.678 0 0 0 3.6-3.019l.54-3.019a2.077 2.077 0 0 0-2.08-1.677 5.965 5.965 0 0 1-2.621.643 5.965 5.965 0 0 1-2.621-.643 3.75 3.75 0 0 0-1.355-.248 3.755 3.755 0 0 0-3.638 3.019Z" />
                    </svg>
                  ][index]}
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-1 lg:mb-2">{feature.title}</h3>
                  <p className="text-gray-200 text-xs lg:text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Login Form Section - Full width on mobile, half on larger screens */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-sm sm:max-w-md relative">
          <div className="absolute top-0 right-0" ref={languageDropdownRef}>
            {/* <button onClick={toggleLanguageDropdown} className="text-gray-700 focus:outline-none flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>{languages.find(lang => lang.key === selectedLanguage)?.label}</span>
            </button> */}
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 mt-10">{translations[selectedLanguage].loginHeader}</h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-1">{translations[selectedLanguage].aadharLabel}</label>
              <input
                id="aadhar"
                type="text"
                placeholder={translations[selectedLanguage].aadharPlaceholder}
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">{translations[selectedLanguage].passwordLabel}</label>
              <input
                id="password"
                type="password"
                placeholder={translations[selectedLanguage].passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-2 sm:py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300 text-sm sm:text-base"
            >
              {translations[selectedLanguage].loginButton}
            </button>
            {message && (
              <p className={`text-center text-sm mt-3 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <div className="text-center mt-3 sm:mt-4">
              <span className="text-gray-600 text-sm">{translations[selectedLanguage].noAccount} </span>
              <button
                onClick={navigateToSignup}
                className="text-green-700 hover:underline text-sm font-semibold"
              >
                {translations[selectedLanguage].signupLink}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Features Section - Only shown on small screens */}
      <div className="md:hidden p-6 bg-white bg-opacity-10 rounded-lg mx-4 my-4">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">{translations[selectedLanguage].featuresHeader}</h2>
        <div className="space-y-4">
          {translations[selectedLanguage].features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-white bg-opacity-15 p-4 rounded-lg"
            >
              <div className="p-2 rounded-full bg-white bg-opacity-20">
                {[
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                  </svg>,
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a9.769 9.769 0 0 0-3.342-6.604l-1.244-1.26a1.125 1.125 0 0 0-1.667.018L3 12M4.5 4.125c0 .621.504 1.125 1.125 1.125H9.75v3.026a.75.75 0 0 1-.214.545l-3.483 3.483a1.5 1.5 0 0 0-.443 1.073v2.025" />
                  </svg>,
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.012.09 2.02.226 3.026.405.533.09.97.404.97.946v3.094c0 .472-.253.917-.673 1.187a5.961 5.961 0 0 1-2.621.643 5.965 5.965 0 0 1-2.621-.643 3.75 3.75 0 0 0-1.355-.248c-.994 0-1.887.685-2.08 1.677l-.54 3.019A3.678 3.678 0 0 0 9.15 17.25h5.7a3.678 3.678 0 0 0 3.6-3.019l.54-3.019a2.077 2.077 0 0 0-2.08-1.677 5.965 5.965 0 0 1-2.621.643 5.965 5.965 0 0 1-2.621-.643 3.75 3.75 0 0 0-1.355-.248 3.755 3.755 0 0 0-3.638 3.019Z" />
                  </svg>
                ][index]}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-gray-200 text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;