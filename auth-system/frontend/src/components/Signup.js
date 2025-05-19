import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
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
      signupHeader: "Farmer's Signup",
      fullName: "Full Name",
      phone: "Phone Number",
      aadhar: "Aadhar Card Number",
      address: "Address",
      password: "Password",
      signupButton: "Signup",
      alreadyAccount: "Already have an account?",
      loginLink: "Login",
      features: [
        {
          title: "Secure Registration",
          description: "Create your account with advanced security features."
        },
        {
          title: "Data Protection",
          description: "Your personal information is encrypted and protected."
        },
        {
          title: "Farmer Support",
          description: "Access tools and resources designed for agricultural success."
        }
      ]
    },
    hi: {
      title: "कृषि सहायता",
      signupHeader: "किसान पंजीकरण",
      fullName: "पूरा नाम",
      phone: "फोन नंबर",
      aadhar: "आधार कार्ड नंबर",
      address: "पता",
      password: "पासवर्ड",
      signupButton: "पंजीकरण करें",
      alreadyAccount: "पहले से ही खाता है?",
      loginLink: "लॉगिन करें",
      features: [
        {
          title: "सुरक्षित पंजीकरण",
          description: "उन्नत सुरक्षा सुविधाओं के साथ अपना खाता बनाएं।"
        },
        {
          title: "डेटा संरक्षण",
          description: "आपकी व्यक्तिगत जानकारी एन्क्रिप्टेड और संरक्षित है।"
        },
        {
          title: "किसान सहायता",
          description: "कृषि सफलता के लिए डिज़ाइन किए गए उपकरण और संसाधनों तक पहुंचें।"
        }
      ]
    },
    as: {
      title: "কৃষি সহায়তা",
      signupHeader: "কৃষকৰ পঞ্জীয়ন",
      fullName: "পূৰ্ণ নাম",
      phone: "ফোন নম্বৰ",
      aadhar: "আধাৰ কাৰ্ড নম্বৰ",
      address: "ঠিকনা",
      password: "পাছৱৰ্ড",
      signupButton: "পঞ্জীয়ন কৰক",
      alreadyAccount: "ইতিমধ্যে এটা একাউণ্ট আছে?",
      loginLink: "লগইন কৰক",
      features: [
        {
          title: "নিৰাপদ পঞ্জীয়ন",
          description: "উন্নত নিৰাপত্তা বৈশিষ্ট্যৰ সৈতে আপোনাৰ একাউণ্ট সৃষ্টি কৰক।"
        },
        {
          title: "তথ্য সুৰক্ষা",
          description: "আপোনাৰ ব্যক্তিগত তথ্য এনক্রিপ্ট কৰা আৰু সুৰক্ষিত।"
        },
        {
          title: "কৃষক সমৰ্থন",
          description: "কৃষি সফলতাৰ বাবে ডিজাইন কৰা সঁজুলি আৰু সম্পদৰ প্ৰৱেশ।"
        }
      ]
    },
    bn: {
      title: "কৃষি সহায়তা",
      signupHeader: "কৃষকের নিবন্ধন",
      fullName: "পুরো নাম",
      phone: "ফোন নম্বর",
      aadhar: "আধার কার্ড নম্বর",
      address: "ঠিকানা",
      password: "পাসওয়ার্ড",
      signupButton: "নিবন্ধন করুন",
      alreadyAccount: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
      loginLink: "লগইন করুন",
      features: [
        {
          title: "নিরাপদ নিবন্ধন",
          description: "উন্নত নিরাপত্তা বৈশিষ্ট্য সহ আপনার অ্যাকাউন্ট তৈরি করুন।"
        },
        {
          title: "ডেটা সুরক্ষা",
          description: "আপনার ব্যক্তিগত তথ্য এনক্রিপ্ট করা এবং সুরক্ষিত।"
        },
        {
          title: "কৃষক সমর্থন",
          description: "কৃষি সাফল্যের জন্য ডিজাইন করা সরঞ্জাম এবং সম্পদে প্রবেশ করুন।"
        }
      ]
    },
    gu: {
      title: "કૃષિ સહાયતા",
      signupHeader: "ખેડૂત નોંધણી",
      fullName: "પૂરું નામ",
      phone: "ફોન નંબર",
      aadhar: "આધાર કાર્ડ નંબર",
      address: "સરનામું",
      password: "પાસવર્ડ",
      signupButton: "નોંધણી કરો",
      alreadyAccount: "પહેલેથી જ એકાઉન્ટ છે?",
      loginLink: "લૉગિન કરો",
      features: [
        {
          title: "સુરક્ષિત નોંધણી",
          description: "અદ્યતન સુરક્ષા સુવિધાઓ સાથે તમારું એકાઉન્ટ બનાવો."
        },
        {
          title: "ડેટા સુરક્ષા",
          description: "તમારી વ્યક્તિગત માહિતી એન્ક્રિપ્ટેડ અને સુરક્ષિત છે."
        },
        {
          title: "ખેડૂત સમર્થન",
          description: "કૃષિ સફળતા માટે ડિઝાઇન કરેલા સાધનો અને સંસાધનોની ઍક્સેસ."
        }
      ]
    },
    kn: {
      title: "ಕೃಷಿ ಸಹಾಯತ",
      signupHeader: "ರೈತರ ನೋಂದಣಿ",
      fullName: "ಪೂರ್ಣ ಹೆಸರು",
      phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
      aadhar: "ಆಧಾರ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ",
      address: "ವಿಳಾಸ",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      signupButton: "ನೋಂದಾಯಿಸಿ",
      alreadyAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
      loginLink: "ಲಾಗಿನ್ ಮಾಡಿ",
      features: [
        {
          title: "ಸುರಕ್ಷಿತ ನೋಂದಣಿ",
          description: "ಸುಧಾರಿತ ಭದ್ರತಾ ವೈಶಿಷ್ಟ್ಯಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ."
        },
        {
          title: "ಡೇಟಾ ರಕ್ಷಣೆ",
          description: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ ಮತ್ತು ರಕ್ಷಿಸಲಾಗಿದೆ."
        },
        {
          title: "ರೈತರ ಬೆಂಬಲ",
          description: "ಕೃಷಿ ಯಶಸ್ಸಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸಾಧನಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳನ್ನು ಪ್ರವೇಶಿಸಿ."
        }
      ]
    },
    ml: {
      title: "കൃഷി സഹായത",
      signupHeader: "കർഷക രജിസ്ട്രേഷൻ",
      fullName: "പൂർണ്ണ നാമം",
      phone: "ഫോൺ നമ്പർ",
      aadhar: "ആധാർ കാർഡ് നമ്പർ",
      address: "വിലാസം",
      password: "പാസ്‌വേഡ്",
      signupButton: "രജിസ്റ്റർ ചെയ്യുക",
      alreadyAccount: "ഇതിനകം ഒരു അക്കൗണ്ട് ഉണ്ടോ?",
      loginLink: "ലോഗിൻ ചെയ്യുക",
      features: [
        {
          title: "സുരക്ഷിത രജിസ്ട്രേഷൻ",
          description: "നൂതന സുരക്ഷാ സവിശേഷതകളോടെ നിന്റെ അക്കൗണ്ട് സൃഷ്ടിക്കുക."
        },
        {
          title: "ഡാറ്റാ സംരക്ഷണം",
          description: "നിന്റെ വ്യക്തിഗത വിവരങ്ങൾ എൻക്രിപ്റ്റ് ചെയ്ത് സംരക്ഷിച്ചിരിക്കുന്നു."
        },
        {
          title: "കർഷക പിന്തുണ",
          description: "കൃഷി വിജയത്തിനായി രൂപകൽപ്പന ചെയ്ത ഉപകരണങ്ങളും വിഭവങ്ങളും ആക്സസ് ചെയ്യുക."
        }
      ]
    },
    mr: {
      title: "कृषी सहाय्यता",
      signupHeader: "शेतकरी नोंदणी",
      fullName: "पूर्ण नाव",
      phone: "फोन नंबर",
      aadhar: "आधार कार्ड क्रमांक",
      address: "पत्ता",
      password: "पासवर्ड",
      signupButton: "नोंदणी करा",
      alreadyAccount: "आधीपासून खाते आहे का?",
      loginLink: "लॉगिन करा",
      features: [
        {
          title: "सुरक्षित नोंदणी",
          description: "प्रगत सुरक्षा वैशिष्ट्यांसह तुमचे खाते तयार करा."
        },
        {
          title: "डेटा संरक्षण",
          description: "तुमची वैयक्तिक माहिती एन्क्रिप्टेड आणि संरक्षित आहे."
        },
        {
          title: "शेतकरी समर्थन",
          description: "कृषी यशासाठी डिझाइन केलेली साधने आणि संसाधने मिळवा."
        }
      ]
    },
    or: {
      title: "କୃଷି ସହାୟତା",
      signupHeader: "ଚାଷୀ ପଞ୍ଜୀକରଣ",
      fullName: "ପୂର୍ଣ୍ଣ ନାମ",
      phone: "ଫୋନ୍ ନମ୍ବର",
      aadhar: "ଆଧାର କାର୍ଡ ନମ୍ବର",
      address: "ଠିକଣା",
      password: "ପାସୱାର୍ଡ",
      signupButton: "ପଞ୍ଜୀକରଣ କରନ୍ତୁ",
      alreadyAccount: "ପୂର୍ବରୁ ଏକ ଆକାଉଣ୍ଟ ଅଛି କି?",
      loginLink: "ଲଗଇନ କରନ୍ତୁ",
      features: [
        {
          title: "ନିରାପଦ ପଞ୍ଜୀକରଣ",
          description: "ଉନ୍ନତ ସୁରକ୍ଷା ବୈଶିଷ୍ଟ୍ୟ ସହିତ ଆପଣଙ୍କ ଆକାଉଣ୍ଟ ସୃଷ୍ଟି କରନ୍ତୁ।"
        },
        {
          title: "ଡାଟା ସୁରକ୍ଷା",
          description: "ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ସୂଚନା ଏନକ୍ରିପ୍ଟ ଏବଂ ସୁରକ୍ଷିତ।"
        },
        {
          title: "ଚାଷୀ ସମର୍ଥନ",
          description: "କୃଷି ସଫଳତା ପାଇଁ ଡିଜାଇନ କରାଯାଇଥିବା ଉପକରଣ ଏବଂ ସମ୍ବଳକୁ ପ୍ରବେଶ କରନ୍ତୁ।"
        }
      ]
    },
    pa: {
      title: "ਕ੍ਰਿਸ਼ੀ ਸਹਾਇਤਾ",
      signupHeader: "ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
      fullName: "ਪੂਰਾ ਨਾਮ",
      phone: "ਫੋਨ ਨੰਬਰ",
      aadhar: "ਆਧਾਰ ਕਾਰਡ ਨੰਬਰ",
      address: "ਪਤਾ",
      password: "ਪਾਸਵਰਡ",
      signupButton: "ਰਜਿਸਟਰ ਕਰੋ",
      alreadyAccount: "ਪਹਿਲਾਂ ਤੋਂ ਹੀ ਖਾਤਾ ਹੈ?",
      loginLink: "ਲੌਗਇਨ ਕਰੋ",
      features: [
        {
          title: "ਸੁਰੱਖਿਅਤ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
          description: "ਉੱਨਤ ਸੁਰੱਖਿਆ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਨਾਲ ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ।"
        },
        {
          title: "ਡਾਟਾ ਸੁਰੱਖਿਆ",
          description: "ਤੁਹਾਡੀ ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਐਨਕ੍ਰਿਪਟਡ ਅਤੇ ਸੁਰੱਖਿਅਤ ਹੈ।"
        },
        {
          title: "ਕਿਸਾਨ ਸਹਾਇਤਾ",
          description: "ਖੇਤੀਬਾੜੀ ਸਫਲਤਾ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤੇ ਗਏ ਸੰਦ ਅਤੇ ਸਰੋਤਾਂ ਤੱਕ ਪਹੁੰਚ ਕਰੋ।"
        }
      ]
    },
    ta: {
      title: "கிருஷி சகாயதா",
      signupHeader: "விவசாயி பதிவு",
      fullName: "முழு பெயர்",
      phone: "தொலைபேசி எண்",
      aadhar: "ஆதார் அட்டை எண்",
      address: "முகவரி",
      password: "கடவுச்சொல்",
      signupButton: "பதிவு செய்",
      alreadyAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
      loginLink: "உள்நுழைக",
      features: [
        {
          title: "பாதுகாப்பான பதிவு",
          description: "மேம்பட்ட பாதுகாப்பு அம்சங்களுடன் உங்கள் கணக்கை உருவாக்கவும்."
        },
        {
          title: "தரவு பாதுகாப்பு",
          description: "உங்கள் தனிப்பட்ட தகவல்கள் குறியாக்கப்பட்டு பாதுகாக்கப்படுகின்றன."
        },
        {
          title: "விவசாயி ஆதரவு",
          description: "விவசாய வெற்றிக்காக வடிவமைக்கப்பட்ட கருவிகள் மற்றும் வளங்களை அணுகவும்."
        }
      ]
    },
    te: {
      title: "కృషి సహాయత",
      signupHeader: "రైతు నమోదు",
      fullName: "పూర్తి పేరు",
      phone: "ఫోన్ నంబర్",
      aadhar: "ఆధార్ కార్డ్ నంబర్",
      address: "చిరునామా",
      password: "పాస్‌వర్డ్",
      signupButton: "నమోదు చేయండి",
      alreadyAccount: "ఇప్పటికే ఖాతా ఉందా?",
      loginLink: "లాగిన్ చేయండి",
      features: [
        {
          title: "సురక్షిత నమోదు",
          description: "అధునాతన భద్రతా లక్షణాలతో మీ ఖాతాను సృష్టించండి."
        },
        {
          title: "డేటా రక్షణ",
          description: "మీ వ్యక్తిగత సమాచారం గుప్తీకరించబడి మరియు రక్షించబడుతుంది."
        },
        {
          title: "రైతు మద్దతు",
          description: "వ్యవసాయ విజయం కోసం రూపొందించిన సాధనాలు మరియు వనరులను యాక్సెస్ చేయండి."
        }
      ]
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [activeFeature, setActiveFeature] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_AVK_ENDPOINT}/api/auth/signup`, {
        fullName,
        phone,
        aadhar,
        address,
        password
      });
      setMessage(response.data.message);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || translations[selectedLanguage].signupFailed || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#364641] bg-cover bg-center" style={{ backgroundImage: `url('/images/farmer.webp')` }}>
      {/* Left Information Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-8 md:py-0">
        <div className="text-white space-y-6 px-4 sm:px-6 md:px-8 max-w-lg">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{translations[selectedLanguage].title}</h1>
          <div className="space-y-4">
            {translations[selectedLanguage].features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 bg-white bg-opacity-10 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeFeature === index ? 'scale-105 shadow-lg bg-opacity-20' : 'hover:bg-opacity-15 hover:scale-102'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  activeFeature === index ? 'bg-white bg-opacity-30' : 'bg-transparent'
                }`}>
                  {[
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0ZM7.5 15.75a3.375 3.375 0 0 1 6.75 0v.003l-.375 1.839a1.5 1.5 0 0 1-1.465 1.858H9a1.5 1.5 0 0 1-1.465-1.859L7.5 15.753Z" />
                    </svg>,
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 0V3.75" />
                    </svg>,
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                  ][index]}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-1">{feature.title}</h3>
                  <p className="text-gray-200 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Signup Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white py-8 md:py-0">
        <div className="w-full max-w-md px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">{translations[selectedLanguage].signupHeader}</h2>
          <div className="space-y-4">
            {/* <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            >
              {languages.map((language) => (
                <option key={language.key} value={language.key}>
                  {language.label}
                </option>
              ))}
            </select> */}
            <input
              type="text"
              placeholder={translations[selectedLanguage].fullName}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <input
              type="text"
              placeholder={translations[selectedLanguage].phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <input
              type="text"
              placeholder={translations[selectedLanguage].aadhar}
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <input
              type="text"
              placeholder={translations[selectedLanguage].address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <input
              type="password"
              placeholder={translations[selectedLanguage].password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
            <button
              onClick={handleSignup}
              className="w-full py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300 text-base md:text-lg"
            >
              {translations[selectedLanguage].signupButton}
            </button>
            {message && (
              <p className="text-center text-sm text-red-600 mt-4">{message}</p>
            )}
            <div className="text-center mt-4">
              <span className="text-gray-600 text-sm md:text-base">{translations[selectedLanguage].alreadyAccount} </span>
              <button
                onClick={() => navigate('/login')}
                className="text-green-700 hover:underline text-sm md:text-base font-semibold"
              >
                {translations[selectedLanguage].loginLink}
              </button>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default Signup;