import React, { useState, useEffect } from 'react';
import QuickAnimatedLoader from './CustomLoader';
import Footer from './Footer';

// Language translations
const translations = {
  en: {
    title: "Farmer Claim Status",
    noClaimsFound: "No Claims Found",
    noClaimsMessage: "We couldn't find any claim applications associated with your Aadhaar number. Submit a new claim to get started.",
    submitNewClaim: "Submit New Claim",
    returnToHome: "Return to Home",
    connectionError: "Connection Error",
    troubleshooting: "Troubleshooting steps:",
    checkInternet: "Check your internet connection",
    verifyServer: "Verify if the server is running",
    refreshPage: "Refresh Page",
    tryRefreshing: "Try refreshing the page",
    clearCache: "Clear your browser cache",
    claims: "Claims:",
    claimId: "Claim ID:",
    submittedOn: "Submitted on:",
    claimAmount: "Claim Amount",
    rejectedMessage: "Your claim has been rejected. The weather conditions do not match the reported loss.",
    approvedMessage: "Your claim has been approved. The compensation amount will be transferred to your bank account shortly.",
    claimProgress: "Claim Progress",
    pending: "Pending",
    claimSubmitted: "Claim Submitted",
    inReview: "In Review",
    verificationProcess: "Verification Process",
    finalDecision: "Final Decision",
    claimDetails: "Claim Details",
    personalInformation: "Personal Information",
    name: "Name:",
    aadhaar: "Aadhaar:",
    phone: "Phone:",
    address: "Address:",
    pincode: "Pincode:",
    claimInformation: "Claim Information",
    claimType: "Claim Type:",
    farmerType: "Farmer Type:",
    causeOfLoss: "Cause of Loss:",
    areaImpacted: "Area Impacted:",
    locationDetails: "Location Details",
    state: "State:",
    district: "District:",
    dateOfSowing: "Date of Sowing:",
    bankDetails: "Bank Details",
    bankName: "Bank Name:",
    accountNumber: "Account Number:",
    backToHome: "Back to Home",
  },
  hi: {
    title: "किसान दावा स्थिति",
    noClaimsFound: "कोई दावा नहीं मिला",
    noClaimsMessage: "हमें आपके आधार नंबर से संबंधित कोई दावा आवेदन नहीं मिला। शुरू करने के लिए नया दावा जमा करें।",
    submitNewClaim: "नया दावा जमा करें",
    returnToHome: "होम पर वापस जाएं",
    connectionError: "कनेक्शन त्रुटि",
    troubleshooting: "समस्या निवारण चरण:",
    checkInternet: "अपना इंटरनेट कनेक्शन जांचें",
    verifyServer: "सर्वर चल रहा है या नहीं, जांचें",
    refreshPage: "पेज ताज़ा करें",
    tryRefreshing: "पेज को ताज़ा करने का प्रयास करें",
    clearCache: "अपने ब्राउज़र का कैश साफ करें",
    claims: "दावे:",
    claimId: "दावा आईडी:",
    submittedOn: "जमा किया गया:",
    claimAmount: "दावा राशि",
    rejectedMessage: "आपका दावा अस्वीकार कर दिया गया है। मौसम की स्थिति बताए गए नुकसान से मेल नहीं खाती।",
    approvedMessage: "आपका दावा स्वीकृत हो गया है। मुआवजा राशि जल्द ही आपके बैंक खाते में स्थानांतरित कर दी जाएगी।",
    claimProgress: "दावा प्रगति",
    pending: "लंबित",
    claimSubmitted: "दावा जमा किया गया",
    inReview: "समीक्षा में",
    verificationProcess: "सत्यापन प्रक्रिया",
    finalDecision: "अंतिम निर्णय",
    claimDetails: "दावा विवरण",
    personalInformation: "व्यक्तिगत जानकारी",
    name: "नाम:",
    aadhaar: "आधार:",
    phone: "फोन:",
    address: "पता:",
    pincode: "पिनकोड:",
    claimInformation: "दावा जानकारी",
    claimType: "दावा प्रकार:",
    farmerType: "किसान प्रकार:",
    causeOfLoss: "नुकसान का कारण:",
    areaImpacted: "प्रभावित क्षेत्र:",
    locationDetails: "स्थान विवरण",
    state: "राज्य:",
    district: "जिला:",
    dateOfSowing: "बुवाई की तारीख:",
    bankDetails: "बैंक विवरण",
    bankName: "बैंक का नाम:",
    accountNumber: "खाता संख्या:",
    backToHome: "होम पर वापस",
  },
  as: {
    title: "কৃষকৰ দাবীৰ স্থিতি",
    noClaimsFound: "কোনো দাবী পোৱা নগ'ল",
    noClaimsMessage: "আপোনাৰ আধাৰ নম্বৰৰ সৈতে সম্পৰ্কিত কোনো দাবীৰ আবেদন আমি পোৱা নাই। আৰম্ভ কৰিবলৈ নতুন দাবী জমা দিয়ক।",
    submitNewClaim: "নতুন দাবী জমা দিয়ক",
    returnToHome: "ঘৰলৈ উভতি যাওক",
    connectionError: "সংযোগ ত্ৰুটি",
    troubleshooting: "সমস্যা সমাধানৰ পদক্ষেপ:",
    checkInternet: "আপোনাৰ ইণ্টাৰনেট সংযোগ পৰীক্ষা কৰক",
    verifyServer: "চাৰ্ভাৰ চলি আছে নে নাই পৰীক্ষা কৰক",
    refreshPage: "পৃষ্ঠা সতেজ কৰক",
    tryRefreshing: "পৃষ্ঠাটো সতেজ কৰাৰ চেষ্টা কৰক",
    clearCache: "আপোনাৰ ব্ৰাউজাৰৰ কেশ্ব সাফ কৰক",
    claims: "দাবীসমূহ:",
    claimId: "দাবীৰ আইডি:",
    submittedOn: "জমা দিয়াৰ তাৰিখ:",
    claimAmount: "দাবীৰ পৰিমাণ",
    rejectedMessage: "আপোনাৰ দাবী নাকচ কৰা হৈছে। বতৰৰ পৰিস্থিতি প্ৰতিবেদিত ক্ষতিৰ সৈতে মিল নাখায়।",
    approvedMessage: "আপোনাৰ দাবী অনুমোদিত হৈছে। ক্ষতিপূৰণৰ পৰিমাণ অতি সোনকালে আপোনাৰ বেংক একাউণ্টত স্থানান্তৰ কৰা হ'ব।",
    claimProgress: "দাবীৰ প্ৰগতি",
    pending: "বাকী",
    claimSubmitted: "দাবী জমা দিয়া হৈছে",
    inReview: "পৰ্যালোচনাত",
    verificationProcess: "যাচাই প্ৰক্ৰিয়া",
    finalDecision: "চূড়ান্ত সিদ্ধান্ত",
    claimDetails: "দাবীৰ বিশদ",
    personalInformation: "ব্যক্তিগত তথ্য",
    name: "নাম:",
    aadhaar: "আধাৰ:",
    phone: "ফোন:",
    address: "ঠিকনা:",
    pincode: "পিনক'ড:",
    claimInformation: "দাবীৰ তথ্য",
    claimType: "দাবীৰ প্ৰকাৰ:",
    farmerType: "কৃষকৰ প্ৰকাৰ:",
    causeOfLoss: "ক্ষতিৰ কাৰণ:",
    areaImpacted: "প্ৰভাৱিত অঞ্চল:",
    locationDetails: "স্থানৰ বিশদ",
    state: "ৰাজ্য:",
    district: "জিলা:",
    dateOfSowing: "বোৱনিৰ তাৰিখ:",
    bankDetails: "বেংকৰ বিশদ",
    bankName: "বেংকৰ নাম:",
    accountNumber: "একাউণ্ট নম্বৰ:",
    backToHome: "ঘৰলৈ উভতি",
  },
  bn: {
    title: "কৃষকের দাবির অবস্থা",
    noClaimsFound: "কোনও দাবি পাওয়া যায়নি",
    noClaimsMessage: "আমরা আপনার আধার নম্বরের সঙ্গে সম্পর্কিত কোনও দাবির আবেদন খুঁজে পাইনি। শুরু করতে নতুন দাবি জমা দিন।",
    submitNewClaim: "নতুন দাবি জমা দিন",
    returnToHome: "হোমে ফিরে যান",
    connectionError: "সংযোগ ত্রুটি",
    troubleshooting: "সমস্যা সমাধানের পদক্ষেপ:",
    checkInternet: "আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন",
    verifyServer: "সার্ভার চলছে কিনা তা যাচাই করুন",
    refreshPage: "পৃষ্ঠা রিফ্রেশ করুন",
    tryRefreshing: "পৃষ্ঠাটি রিফ্রেশ করার চেষ্টা করুন",
    clearCache: "আপনার ব্রাউজারের ক্যাশ সাফ করুন",
    claims: "দাবি:",
    claimId: "দাবির আইডি:",
    submittedOn: "জমা দেওয়া হয়েছে:",
    claimAmount: "দাবির পরিমাণ",
    rejectedMessage: "আপনার দাবি প্রত্যাখ্যান করা হয়েছে। আবহাওয়ার অবস্থা প্রতিবেদিত ক্ষতির সঙ্গে মেলে না।",
    approvedMessage: "আপনার দাবি অনুমোদিত হয়েছে। ক্ষতিপূরণের পরিমাণ শীঘ্রই আপনার ব্যাঙ্ক অ্যাকাউন্টে স্থানান্তরিত হবে।",
    claimProgress: "দাবির অগ্রগতি",
    pending: "মুলতুবি",
    claimSubmitted: "দাবি জমা দেওয়া হয়েছে",
    inReview: "পর্যালোচনাধীন",
    verificationProcess: "যাচাই প্রক্রিয়া",
    finalDecision: "চূড়ান্ত সিদ্ধান্ত",
    claimDetails: "দাবির বিবরণ",
    personalInformation: "ব্যক্তিগত তথ্য",
    name: "নাম:",
    aadhaar: "আধার:",
    phone: "ফোন:",
    address: "ঠিকানা:",
    pincode: "পিনকোড:",
    claimInformation: "দাবির তথ্য",
    claimType: "দাবির প্রকার:",
    farmerType: "কৃষকের প্রকার:",
    causeOfLoss: "ক্ষতির কারণ:",
    areaImpacted: "প্রভাবিত এলাকা:",
    locationDetails: "অবস্থানের বিবরণ",
    state: "রাজ্য:",
    district: "জেলা:",
    dateOfSowing: "বপনের তারিখ:",
    bankDetails: "ব্যাঙ্কের বিবরণ",
    bankName: "ব্যাঙ্কের নাম:",
    accountNumber: "অ্যাকাউন্ট নম্বর:",
    backToHome: "হোমে ফিরে",
  },
  gu: {
    title: "ખેડૂત દાવાની સ્થિતિ",
    noClaimsFound: "કોઈ દાવા મળ્યા નથી",
    noClaimsMessage: "અમને તમારા આધાર નંબર સાથે સંબંધિત કોઈ દાવાની અરજી મળી નથી. શરૂ કરવા માટે નવો દાવો સબમિટ કરો.",
    submitNewClaim: "નવો દાવો સબમિટ કરો",
    returnToHome: "હોમ પર પાછા ફરો",
    connectionError: "કનેક્શન ભૂલ",
    troubleshooting: "સમસ્યા નિવારણનાં પગલાં:",
    checkInternet: "તમારું ઇન્ટરનેટ કનેક્શન તપાસો",
    verifyServer: "સર્વર ચાલે છે કે નહીં તે તપાસો",
    refreshPage: "પૃષ્ઠ રિફ્રેશ કરો",
    tryRefreshing: "પૃષ્ઠને રિફ્રેશ કરવાનો પ્રયાસ કરો",
    clearCache: "તમારા બ્રાઉઝરની કેશ સાફ કરો",
    claims: "દાવા:",
    claimId: "દાવાની આઈડી:",
    submittedOn: "સબમિટ કરેલ તારીખ:",
    claimAmount: "દાવાની રકમ",
    rejectedMessage: "તમારો દાવો નકારવામાં આવ્યો છે. હવામાનની સ્થિતિ નોંધાયેલ નુકસાન સાથે મેળ ખાતી નથી.",
    approvedMessage: "તમારો દાવો મંજૂર થયો છે. વળતરની રકમ ટૂંક સમયમાં તમારા બેંક ખાતામાં ટ્રાન્સફર કરવામાં આવશે.",
    claimProgress: "દાવાની પ્રગતિ",
    pending: "બાકી",
    claimSubmitted: "દાવો સબમિટ કરાયો",
    inReview: "સમીક્ષામાં",
    verificationProcess: "ચકાસણી પ્રક્રિયા",
    finalDecision: "અંતિમ નિર્ણય",
    claimDetails: "દાવાની વિગતો",
    personalInformation: "વ્યક્તિગત માહિતી",
    name: "નામ:",
    aadhaar: "આધાર:",
    phone: "ફોન:",
    address: "સરનામું:",
    pincode: "પિનકોડ:",
    claimInformation: "દાવાની માહિતી",
    claimType: "દાવાનો પ્રકાર:",
    farmerType: "ખેડૂતનો પ્રકાર:",
    causeOfLoss: "નુકસાનનું કારણ:",
    areaImpacted: "પ્રભાવિત વિસ્તાર:",
    locationDetails: "સ્થાનની વિગતો",
    state: "રાજ્ય:",
    district: "જિલ્લો:",
    dateOfSowing: "વાવણીની તારીખ:",
    bankDetails: "બેંકની વિગતો",
    bankName: "બેંકનું નામ:",
    accountNumber: "ખાતા નંબર:",
    backToHome: "હોમ પર પાછા",
  },
  kn: {
    title: "ರೈತರ ಕ್ಲೈಮ್ ಸ್ಥಿತಿ",
    noClaimsFound: "ಯಾವುದೇ ಕ್ಲೈಮ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    noClaimsMessage: "ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆಗೆ ಸಂಬಂಧಿಸಿದ ಯಾವುದೇ ಕ್ಲೈಮ್ ಅರ್ಜಿಗಳು ನಮಗೆ ಸಿಗಲಿಲ್ಲ. ಆರಂಭಿಸಲು ಹೊಸ ಕ್ಲೈಮ್ ಸಲ್ಲಿಸಿ.",
    submitNewClaim: "ಹೊಸ ಕ್ಲೈಮ್ ಸಲ್ಲಿಸಿ",
    returnToHome: "ಮುಖಪುಟಕ್ಕೆ ಮರಳಿ",
    connectionError: "ಸಂಪರ್ಕ ದೋಷ",
    troubleshooting: "ಸಮಸ್ಯೆ ಪರಿಹಾರದ ಹಂತಗಳು:",
    checkInternet: "ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ",
    verifyServer: "ಸರ್ವರ್ ಚಾಲನೆಯಲ್ಲಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ",
    refreshPage: "ಪುಟವನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ",
    tryRefreshing: "ಪುಟವನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಲು ಪ್ರಯತ್ನಿಸಿ",
    clearCache: "ನಿಮ್ಮ ಬ್ರೌಸರ್ ಕ್ಯಾಶೆಯನ್ನು ತೆರವುಗೊಳಿಸಿ",
    claims: "ಕ್ಲೈಮ್‌ಗಳು:",
    claimId: "ಕ್ಲೈಮ್ ಐಡಿ:",
    submittedOn: "ಸಲ್ಲಿಸಲಾದ ದಿನಾಂಕ:",
    claimAmount: "ಕ್ಲೈಮ್ ಮೊತ್ತ",
    rejectedMessage: "ನಿಮ್ಮ ಕ್ಲೈಮ್ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ. ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು ವರದಿಯಾದ ನಷ್ಟದೊಂದಿಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.",
    approvedMessage: "ನಿಮ್ಮ ಕ್ಲೈಮ್ ಅನುಮೋದಿತವಾಗಿದೆ. ಪರಿಹಾರ ಮೊತ್ತವನ್ನು ಶೀಘ್ರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ವರ್ಗಾಯಿಸಲಾಗುವುದು.",
    claimProgress: "ಕ್ಲೈಮ್ ಪ್ರಗತಿ",
    pending: "ಬಾಕಿಯಿದೆ",
    claimSubmitted: "ಕ್ಲೈಮ್ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    inReview: "ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ",
    verificationProcess: "ಪರಿಶೀಲನೆ ಪ್ರಕ್ರಿಯೆ",
    finalDecision: "ಅಂತಿಮ ತೀರ್ಮಾನ",
    claimDetails: "ಕ್ಲೈಮ್ ವಿವರಗಳು",
    personalInformation: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
    name: "ಹೆಸರು:",
    aadhaar: "ಆಧಾರ್:",
    phone: "ಫೋನ್:",
    address: "ವಿಳಾಸ:",
    pincode: "ಪಿನ್‌ಕೋಡ್:",
    claimInformation: "ಕ್ಲೈಮ್ ಮಾಹಿತಿ",
    claimType: "ಕ್ಲೈಮ್ ಪ್ರಕಾರ:",
    farmerType: "ರೈತರ ಪ್ರಕಾರ:",
    causeOfLoss: "ನಷ್ಟದ ಕಾರಣ:",
    areaImpacted: "ಪ್ರಭಾವಿತ ಪ್ರದೇಶ:",
    locationDetails: "ಸ್ಥಳದ ವಿವರಗಳು",
    state: "ರಾಜ್ಯ:",
    district: "ಜಿಲ್ಲೆ:",
    dateOfSowing: "ಬಿತ್ತನೆ ದಿನಾಂಕ:",
    bankDetails: "ಬ್ಯಾಂಕ್ ವಿವರಗಳು",
    bankName: "ಬ್ಯಾಂಕ್ ಹೆಸರು:",
    accountNumber: "ಖಾತೆ ಸಂಖ್ಯೆ:",
    backToHome: "ಮುಖಪುಟಕ್ಕೆ ಮರಳಿ",
  },
  ml: {
    title: "കർഷക ക്ലെയിം സ്റ്റാറ്റസ്",
    noClaimsFound: "ക്ലെയിമുകൾ ഒന്നും കണ്ടെത്തിയില്ല",
    noClaimsMessage: "നിന്റെ ആധാർ നമ്പറുമായി ബന്ധപ്പെട്ട ഒരു ക്ലെയിം അപേക്ഷയും ഞങ്ങൾക്ക് കണ്ടെത്താനായില്ല. ആരംഭിക്കാൻ പുതിയ ക്ലെയിം സമർപ്പിക്കുക.",
    submitNewClaim: "പുതിയ ക്ലെയിം സമർപ്പിക്കുക",
    returnToHome: "ഹോമിലേക്ക് മടങ്ങുക",
    connectionError: "കണക്ഷൻ പിശക്",
    troubleshooting: "പരിഹാര നടപടികൾ:",
    checkInternet: "നിന്റെ ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കുക",
    verifyServer: "സെർവർ പ്രവർത്തിക്കുന്നുണ്ടോ എന്ന് പരിശോധിക്കുക",
    refreshPage: "പേജ് റിഫ്രഷ് ചെയ്യുക",
    tryRefreshing: "പേജ് റിഫ്രഷ് ചെയ്യാൻ ശ്രമിക്കുക",
    clearCache: "നിന്റെ ബ്രൗസറിന്റെ കാഷെ മായ്ക്കുക",
    claims: "ക്ലെയിമുകൾ:",
    claimId: "ക്ലെയിം ഐഡി:",
    submittedOn: "സമർപ്പിച്ച തീയതി:",
    claimAmount: "ക്ലെയിം തുക",
    rejectedMessage: "നിന്റെ ക്ലെയിം നിരസിക്കപ്പെട്ടു. കാലാവസ്ഥാ വ്യവസ്ഥകൾ റിപ്പോർട്ട് ചെയ്ത നഷ്ടവുമായി പൊരുത്തപ്പെടുന്നില്ല.",
    approvedMessage: "നിന്റെ ക്ലെയിം അംഗീകരിക്കപ്പെട്ടു. നഷ്ടപരിഹാര തുക ഉടൻ തന്നെ നിന്റെ ബാങ്ക് അക്കൗണ്ടിലേക്ക് മാറ്റപ്പെടും.",
    claimProgress: "ക്ലെയിം പുരോഗതി",
    pending: "തീർച്ചപ്പെടുത്താത്ത",
    claimSubmitted: "ക്ലെയിം സമർപ്പിച്ചു",
    inReview: "അവലോകനത്തിൽ",
    verificationProcess: "പരിശോധന പ്രക്രിയ",
    finalDecision: "അന്തിമ തീരുമാനം",
    claimDetails: "ക്ലെയിം വിശദാംശങ്ങൾ",
    personalInformation: "വ്യക്തിഗത വിവരങ്ങൾ",
    name: "പേര്:",
    aadhaar: "ആധാർ:",
    phone: "ഫോൺ:",
    address: "വിലാസം:",
    pincode: "പിൻകോഡ്:",
    claimInformation: "ക്ലെയിം വിവരങ്ങൾ",
    claimType: "ക്ലെയിം തരം:",
    farmerType: "കർഷക തരം:",
    causeOfLoss: "നഷ്ടത്തിന്റെ കാരണം:",
    areaImpacted: "പ്രഭാവിത പ്രദേശം:",
    locationDetails: "ലൊക്കേഷൻ വിശദാംശങ്ങൾ",
    state: "സംസ്ഥാനം:",
    district: "ജില്ല:",
    dateOfSowing: "വിതച്ച തീയതി:",
    bankDetails: "ബാങ്ക് വിശദാംശങ്ങൾ",
    bankName: "ബാങ്കിന്റെ പേര്:",
    accountNumber: "അക്കൗണ്ട് നമ്പർ:",
    backToHome: "ഹോമിലേക്ക് മടങ്ങുക",
  },
  mr: {
    title: "शेतकरी दाव्याची स्थिती",
    noClaimsFound: "कोणतेही दावे सापडले नाहीत",
    noClaimsMessage: "आम्हाला तुमच्या आधार क्रमांकाशी संबंधित कोणतेही दावे अर्ज सापडले नाहीत. सुरू करण्यासाठी नवीन दावा सादर करा.",
    submitNewClaim: "नवीन दावा सादर करा",
    returnToHome: "मुख्यपृष्ठावर परत जा",
    connectionError: "कनेक्शन त्रुटी",
    troubleshooting: "समस्यानिवारण पायऱ्या:",
    checkInternet: "तुमचे इंटरनेट कनेक्शन तपासा",
    verifyServer: "सर्व्हर चालू आहे का ते तपासा",
    refreshPage: "पृष्ठ रिफ्रेश करा",
    tryRefreshing: "पृष्ठ रिफ्रेश करण्याचा प्रयत्न करा",
    clearCache: "तुमच्या ब्राउझरचा कॅशे साफ करा",
    claims: "दावे:",
    claimId: "दावा आयडी:",
    submittedOn: "सादर केलेले तारीख:",
    claimAmount: "दाव्याची रक्कम",
    rejectedMessage: "तुमचा दावा नाकारण्यात आला आहे. हवामान परिस्थिती नोंदवलेल्या नुकसानाशी जुळत नाही.",
    approvedMessage: "तुमचा दावा मंजूर झाला आहे. नुकसानभरपाई रक्कम लवकरच तुमच्या बँक खात्यात हस्तांतरित केली जाईल.",
    claimProgress: "दाव्याची प्रगती",
    pending: "प्रलंबित",
    claimSubmitted: "दावा सादर केला",
    inReview: "पुनरावलोकनात",
    verificationProcess: "पडताळणी प्रक्रिया",
    finalDecision: "अंतिम निर्णय",
    claimDetails: "दाव्याचे तपशील",
    personalInformation: "वैयक्तिक माहिती",
    name: "नाव:",
    aadhaar: "आधार:",
    phone: "फोन:",
    address: "पत्ता:",
    pincode: "पिनकोड:",
    claimInformation: "दाव्याची माहिती",
    claimType: "दाव्याचा प्रकार:",
    farmerType: "शेतकरी प्रकार:",
    causeOfLoss: "नुकसानाचे कारण:",
    areaImpacted: "प्रभावित क्षेत्र:",
    locationDetails: "स्थान तपशील",
    state: "राज्य:",
    district: "जिल्हा:",
    dateOfSowing: "पेरणीची तारीख:",
    bankDetails: "बँक तपशील",
    bankName: "बँकेचे नाव:",
    accountNumber: "खाते क्रमांक:",
    backToHome: "मुख्यपृष्ठावर परत",
  },
  or: {
    title: "ଚାଷୀ ଦାବି ସ୍ଥିତି",
    noClaimsFound: "କୌଣସି ଦାବି ମିଳିଲା ନାହିଁ",
    noClaimsMessage: "ଆମେ ଆପଣଙ୍କ ଆଧାର ନମ୍ବର ସହିତ ସମ୍ପର୍କିତ କୌଣସି ଦାବି ଆବେଦନ ଖୋଜି ପାଇଲୁ ନାହିଁ। ଆରମ୍ଭ କରିବା ପାଇଁ ନୂଆ ଦାବି ଦାଖଲ କରନ୍ତୁ।",
    submitNewClaim: "ନୂଆ ଦାବି ଦାଖଲ କରନ୍ତୁ",
    returnToHome: "ମୁଖ୍ୟପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ",
    connectionError: "ସଂଯୋଗ ତ୍ରୁଟି",
    troubleshooting: "ସମସ୍ୟା ନିବାରଣ ପଦକ୍ଷେପ:",
    checkInternet: "ଆପଣଙ୍କ ଇଣ୍ଟରନେଟ ସଂଯୋଗ ଯାଞ୍ଚ କରନ୍ତୁ",
    verifyServer: "ସର୍ଭର ଚାଲୁଛି କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ",
    refreshPage: "ପୃଷ୍ଠା ରିଫ୍ରେସ୍ କରନ୍ତୁ",
    tryRefreshing: "ପୃଷ୍ଠାଟି ରିଫ୍ରେସ୍ କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ",
    clearCache: "ଆପଣଙ୍କ ବ୍ରାଉଜରର କ୍ୟାଶେ ସଫା କରନ୍ତୁ",
    claims: "ଦାବିଗୁଡ଼ିକ:",
    claimId: "ଦାବି ଆଇଡି:",
    submittedOn: "ଦାଖଲ କରାଯାଇଥିବା ତାରିଖ:",
    claimAmount: "ଦାବି ରାଶି",
    rejectedMessage: "ଆପଣଙ୍କ ଦାବି ନାକଚ ହୋଇଛି। ପାଗ ଅବସ୍ଥା ରିପୋର୍ଟ ହୋଇଥିବା କ୍ଷତି ସହିତ ମେଳ ଖାଉ ନାହିଁ।",
    approvedMessage: "ଆପଣଙ୍କ ଦାବି ଅନୁମୋଦିତ ହୋଇଛି। କ୍ଷତିପୂରଣ ରାଶି ଶୀଘ୍ର ଆପଣଙ୍କ ବ୍ୟାଙ୍କ ଖାତାକୁ ସ୍ଥାନାନ୍ତରିତ ହେବ।",
    claimProgress: "ଦାବି ପ୍ରଗତି",
    pending: "ବାକି",
    claimSubmitted: "ଦାବି ଦାଖଲ କରାଯାଇଛି",
    inReview: "ସମୀକ୍ଷାରେ",
    verificationProcess: "ଯାଞ୍ଚ ପ୍ରକ୍ରିୟା",
    finalDecision: "ଅନ୍ତିମ ନିଷ୍ପତ୍ତି",
    claimDetails: "ଦାବି ବିବରଣୀ",
    personalInformation: "ବ୍ୟକ୍ତିଗତ ସୂଚନା",
    name: "ନାମ:",
    aadhaar: "ଆଧାର:",
    phone: "ଫୋନ:",
    address: "ଠିକଣା:",
    pincode: "ପିନକୋଡ:",
    claimInformation: "ଦାବି ସୂଚନା",
    claimType: "ଦାବି ପ୍ରକାର:",
    farmerType: "ଚାଷୀ ପ୍ରକାର:",
    causeOfLoss: "କ୍ଷତିର କାରଣ:",
    areaImpacted: "ପ୍ରଭାବିତ ଅଞ୍ଚଳ:",
    locationDetails: "ସ୍ଥାନ ବିବରଣୀ",
    state: "ରାଜ୍ୟ:",
    district: "ଜିଲ୍ଲା:",
    dateOfSowing: "ବୁଣିବାର ତାରିଖ:",
    bankDetails: "ବ୍ୟାଙ୍କ ବିବରଣୀ",
    bankName: "ବ୍ୟାଙ୍କର ନାମ:",
    accountNumber: "ଖାତା ନମ୍ବର:",
    backToHome: "ମୁଖ୍ୟପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ",
  },
  pa: {
    title: "ਕਿਸਾਨ ਦਾਅਵੇ ਦੀ ਸਥਿਤੀ",
    noClaimsFound: "ਕੋਈ ਦਾਅਵੇ ਨਹੀਂ ਮਿਲੇ",
    noClaimsMessage: "ਸਾਨੂੰ ਤੁਹਾਡੇ ਆਧਾਰ ਨੰਬਰ ਨਾਲ ਸਬੰਧਤ ਕੋਈ ਦਾਅਵਾ ਅਰਜ਼ੀ ਨਹੀਂ ਮਿਲੀ। ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਨਵਾਂ ਦਾਅਵਾ ਜਮ੍ਹਾਂ ਕਰੋ।",
    submitNewClaim: "ਨਵਾਂ ਦਾਅਵਾ ਜਮ੍ਹਾਂ ਕਰੋ",
    returnToHome: "ਹੋਮ 'ਤੇ ਵਾਪਸ ਜਾਓ",
    connectionError: "ਕੁਨੈਕਸ਼ਨ ਗਲਤੀ",
    troubleshooting: "ਸਮੱਸਿਆ ਨਿਵਾਰਨ ਦੇ ਕਦਮ:",
    checkInternet: "ਆਪਣਾ ਇੰਟਰਨੈੱਟ ਕੁਨੈਕਸ਼ਨ ਜਾਂਚੋ",
    verifyServer: "ਸਰਵਰ ਚੱਲ ਰਿਹਾ ਹੈ ਜਾਂ ਨਹੀਂ, ਜਾਂਚ ਕਰੋ",
    refreshPage: "ਪੇਜ ਨੂੰ ਰਿਫਰੈਸ਼ ਕਰੋ",
    tryRefreshing: "ਪੇਜ ਨੂੰ ਰਿਫਰੈਸ਼ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    clearCache: "ਆਪਣੇ ਬ੍ਰਾਉਜ਼ਰ ਦਾ ਕੈਸ਼ ਸਾਫ ਕਰੋ",
    claims: "ਦਾਅਵੇ:",
    claimId: "ਦਾਅਵਾ ਆਈਡੀ:",
    submittedOn: "ਜਮ੍ਹਾਂ ਕੀਤਾ ਗਿਆ:",
    claimAmount: "ਦਾਅਵੇ ਦੀ ਰਕਮ",
    rejectedMessage: "ਤੁਹਾਡਾ ਦਾਅਵਾ ਰੱਦ ਕਰ ਦਿੱਤਾ ਗਿਆ ਹੈ। ਮੌਸਮ ਦੀਆਂ ਸਥਿਤੀਆਂ ਰਿਪੋਰਟ ਕੀਤੇ ਨੁਕਸਾਨ ਨਾਲ ਮੇਲ ਨਹੀਂ ਖਾਂਦੀਆਂ।",
    approvedMessage: "ਤੁਹਾਡਾ ਦਾਅਵਾ ਮਨਜ਼ੂਰ ਹੋ ਗਿਆ ਹੈ। ਮੁਆਵਜ਼ੇ ਦੀ ਰਕਮ ਜਲਦੀ ਹੀ ਤੁਹਾਡੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਟ੍ਰਾਂਸਫਰ ਕਰ ਦਿੱਤੀ ਜਾਵੇਗੀ।",
    claimProgress: "ਦਾਅਵੇ ਦੀ ਪ੍ਰਗਤੀ",
    pending: "ਬਕਾਇਆ",
    claimSubmitted: "ਦਾਅਵਾ ਜਮ੍ਹਾਂ ਕੀਤਾ ਗਿਆ",
    inReview: "ਸਮੀਖਿਆ ਵਿੱਚ",
    verificationProcess: "ਪੜਤਾਲ ਪ੍ਰਕਿਰਿਆ",
    finalDecision: "ਅੰਤਿਮ ਫੈਸਲਾ",
    claimDetails: "ਦਾਅਵੇ ਦੇ ਵੇਰਵੇ",
    personalInformation: "ਨਿੱਜੀ ਜਾਣਕਾਰੀ",
    name: "ਨਾਮ:",
    aadhaar: "ਆਧਾਰ:",
    phone: "ਫੋਨ:",
    address: "ਪਤਾ:",
    pincode: "ਪਿੰਨਕੋਡ:",
    claimInformation: "ਦਾਅਵੇ ਦੀ ਜਾਣਕਾਰੀ",
    claimType: "ਦਾਅਵੇ ਦੀ ਕਿਸਮ:",
    farmerType: "ਕਿਸਾਨ ਦੀ ਕਿਸਮ:",
    causeOfLoss: "ਨੁਕਸਾਨ ਦਾ ਕਾਰਨ:",
    areaImpacted: "ਪ੍ਰਭਾਵਿਤ ਖੇਤਰ:",
    locationDetails: "ਸਥਾਨ ਦੇ ਵੇਰਵੇ",
    state: "ਰਾਜ:",
    district: "ਜ਼ਿਲ੍ਹਾ:",
    dateOfSowing: "ਬਿਜਾਈ ਦੀ ਤਾਰੀਖ:",
    bankDetails: "ਬੈਂਕ ਦੇ ਵੇਰਵੇ",
    bankName: "ਬੈਂਕ ਦਾ ਨਾਮ:",
    accountNumber: "ਖਾਤਾ ਨੰਬਰ:",
    backToHome: "ਹੋਮ 'ਤੇ ਵਾਪਸ",
  },
  ta: {
    title: "விவசாயி உரிமைகோரல் நிலை",
    noClaimsFound: "எந்த உரிமைகோரல்களும் கிடைக்கவில்லை",
    noClaimsMessage: "உங்கள் ஆதார் எண்ணுடன் தொடர்புடைய எந்த உரிமைகோரல் விண்ணப்பங்களையும் எங்களால் கண்டுபிடிக்க முடியவில்லை. தொடங்குவதற்கு புதிய உரிமைகோரலை சமர்ப்பிக்கவும்.",
    submitNewClaim: "புதிய உரிமைகோரலை சமர்ப்பிக்கவும்",
    returnToHome: "முகப்பு பக்கத்திற்கு திரும்பவும்",
    connectionError: "இணைப்பு பிழை",
    troubleshooting: "பிழைத் தீர்க்கும் படிகள்:",
    checkInternet: "உங்கள் இணைய இணைப்பை சரிபார்க்கவும்",
    verifyServer: "சர்வர் இயங்குகிறதா என சரிபார்க்கவும்",
    refreshPage: "பக்கத்தை புதுப்பிக்கவும்",
    tryRefreshing: "பக்கத்தை புதுப்பிக்க முயற்சிக்கவும்",
    clearCache: "உங்கள் உலாவியின் கேச்-ஐ அழிக்கவும்",
    claims: "உரிமைகோரல்கள்:",
    claimId: "உரிமைகோரல் ஐடி:",
    submittedOn: "சமர்ப்பிக்கப்பட்ட தேதி:",
    claimAmount: "உரிமைகோரல் தொகை",
    rejectedMessage: "உங்கள் உரிமைகோரல் நிராகரிக்கப்பட்டது. வானிலை நிலைமைகள் அறிவிக்கப்பட்ட இழப்புடன் பொருந்தவில்லை.",
    approvedMessage: "உங்கள் உரிமைகோரல் அங்கீகரிக்கப்பட்டது. இழப்பீட்டு தொகை விரைவில் உங்கள் வங்கி கணக்கிற்கு மாற்றப்படும்.",
    claimProgress: "உரிமைகோரல் முன்னேற்றம்",
    pending: "நிலுவையில்",
    claimSubmitted: "உரிமைகோரல் சமர்ப்பிக்கப்பட்டது",
    inReview: "மதிப்பாய்வில்",
    verificationProcess: "சரிபார்ப்பு செயல்முறை",
    finalDecision: "இறுதி முடிவு",
    claimDetails: "உரிமைகோரல் விவரங்கள்",
    personalInformation: "தனிப்பட்ட தகவல்",
    name: "பெயர்:",
    aadhaar: "ஆதார்:",
    phone: "தொலைபேசி:",
    address: "முகவரி:",
    pincode: "பின்கோடு:",
    claimInformation: "உரிமைகோரல் தகவல்",
    claimType: "உரிமைகோரல் வகை:",
    farmerType: "விவசாயி வகை:",
    causeOfLoss: "இழப்பின் காரணம்:",
    areaImpacted: "பாதிக்கப்பட்ட பகுதி:",
    locationDetails: "இட விவரங்கள்",
    state: "மாநிலம்:",
    district: "மாவட்டம்:",
    dateOfSowing: "விதைப்பு தேதி:",
    bankDetails: "வங்கி விவரங்கள்",
    bankName: "வங்கியின் பெயர்:",
    accountNumber: "கணக்கு எண்:",
    backToHome: "முகப்பு பக்கத்திற்கு திரும்பவும்",
  },
  te: {
    title: "రైతు క్లెయిమ్ స్థితి",
    noClaimsFound: "ఎటువంటి క్లెయిమ్‌లు కనుగొనబడలేదు",
    noClaimsMessage: "మీ ఆధార్ నంబర్‌తో సంబంధం ఉన్న ఎటువంటి క్లెయిమ్ దరఖాస్తులను మేము కనుగొనలేదు. ప్రారంభించడానికి కొత్త క్లెయిమ్‌ను సమర్పించండి.",
    submitNewClaim: "కొత్త క్లెయిమ్ సమర్పించండి",
    returnToHome: "హోమ్‌కు తిరిగి వెళ్ళండి",
    connectionError: "కనెక్షన్ లోపం",
    troubleshooting: "సమస్య పరిష్కార దశలు:",
    checkInternet: "మీ ఇంటర్నెట్ కనెక్షన్‌ను తనిఖీ చేయండి",
    verifyServer: "సర్వర్ పనిచేస్తుందో లేదో తనిఖీ చేయండి",
    refreshPage: "పేజీని రిఫ్రెష్ చేయండి",
    tryRefreshing: "పేజీని రిఫ్రెష్ చేయడానికి ప్రయత్నించండి",
    clearCache: "మీ బ్రౌజర్ కాష్‌ను క్లియర్ చేయండి",
    claims: "క్లెయిమ్‌లు:",
    claimId: "క్లెయిమ్ ఐడీ:",
    submittedOn: "సమర్పించిన తేదీ:",
    claimAmount: "క్లెయిమ్ మొత్తం",
    rejectedMessage: "మీ క్లెయిమ్ తిరస్కరించబడింది. వాతావరణ పరిస్థితులు నివేదించిన నష్టంతో సరిపోలడం లేదు.",
    approvedMessage: "మీ క్లెయిమ్ ఆమోదించబడింది. పరిహార మొత్తం త్వరలో మీ బ్యాంక్ ఖాతాకు బదిలీ చేయబడుతుంది.",
    claimProgress: "క్లెయిమ్ పురోగతి",
    pending: "పెండింగ్",
    claimSubmitted: "క్లెయిమ్ సమర్పించబడింది",
    inReview: "సమీక్షలో",
    verificationProcess: "ధృవీకరణ ప్రక్రియ",
    finalDecision: "చివరి నిర్ణయం",
    claimDetails: "క్లెయిమ్ వివరాలు",
    personalInformation: "వ్యక్తిగత సమాచారం",
    name: "పేరు:",
    aadhaar: "ఆధార్:",
    phone: "ఫోన్:",
    address: "చిరునామా:",
    pincode: "పిన్‌కోడ్:",
    claimInformation: "క్లెయిమ్ సమాచారం",
    claimType: "క్లెయిమ్ రకం:",
    farmerType: "రైతు రకం:",
    causeOfLoss: "నష్టం కారణం:",
    areaImpacted: "ప్రభావిత ప్రాంతం:",
    locationDetails: "స్థాన వివరాలు",
    state: "రాష్ట్రం:",
    district: "జిల్లా:",
    dateOfSowing: "విత్తన తేదీ:",
    bankDetails: "బ్యాంక్ వివరాలు",
    bankName: "బ్యాంక్ పేరు:",
    accountNumber: "ఖాతా సంఖ్య:",
    backToHome: "హోమ్‌కు తిరిగి",
  },
};

// Supported languages
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

const Status = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [claimsPerPage] = useState(1);
  const [activeClaim, setActiveClaim] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }, [selectedLanguage]);

  // Fetch claims data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAadhar = localStorage.getItem("userAadhar");
        if (!userAadhar) {
          throw new Error(translations[selectedLanguage].connectionError);
        }
        const response = await fetch(`${process.env.REACT_APP_AVK_ENDPOINT}/api/complain?aadhaar=${userAadhar}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          if (response.status === 404) {
            setNoRecordFound(true);
            return;
          }
          throw new Error(`API responded with status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API didn't return JSON. Got: " + contentType);
        }
        const data = await response.json();
        if (!data || (Array.isArray(data) && data.length === 0)) {
          setNoRecordFound(true);
          return;
        }
        if (Array.isArray(data)) {
          const userApplications = data.filter(item => item.aadhaar === userAadhar);
          if (userApplications && userApplications.length > 0) {
            setClaims(userApplications);
            setActiveClaim(userApplications[0]);
          } else {
            setNoRecordFound(true);
          }
        } else {
          setClaims([data]);
          setActiveClaim(data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedLanguage]);

  // Pagination logic
  useEffect(() => {
    if (claims.length > 0) {
      const indexOfLastClaim = currentPage * claimsPerPage;
      const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
      setActiveClaim(claims[indexOfFirstClaim]);
    }
  }, [currentPage, claims, claimsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusStep = (status) => {
    switch (status) {
      case "Pending":
        return 1;
      case "In Review":
        return 2;
      case "Approved":
      case "Rejected":
        return 3;
      default:
        return 1;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      case "In Review":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return <QuickAnimatedLoader />;
  }

  if (error) {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-screen p-4">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-lg p-6 max-w-md mb-4">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-bold text-gray-800">{translations[selectedLanguage].connectionError}</h3>
            </div>
            <p className="text-gray-700 mb-4">{error}</p>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">{translations[selectedLanguage].troubleshooting}</h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>{translations[selectedLanguage].checkInternet}</li>
                <li>{translations[selectedLanguage].verifyServer}</li>
                <li>{translations[selectedLanguage].tryRefreshing}</li>
                <li>{translations[selectedLanguage].clearCache}</li>
              </ul>
            </div>
            <button onClick={() => window.location.reload()} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow transition duration-150 flex items-center justify-center w-full">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {translations[selectedLanguage].refreshPage}
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (noRecordFound) {
    return (
      <>
        <div className="min-h-screen py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex justify-end mb-4">
              {/* <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg p-2"
              >
                {languages.map((lang) => (
                  <option key={lang.key} value={lang.key}>{lang.label}</option>
                ))}
              </select> */}
            </div>
            <div className="flex flex-col justify-center items-center py-12">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md transform transition-all duration-300 hover:scale-105">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{translations[selectedLanguage].noClaimsFound}</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">{translations[selectedLanguage].noClaimsMessage}</p>
                <div className="flex flex-col space-y-3">
                  <a href="/complain" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-150 font-medium flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    {translations[selectedLanguage].submitNewClaim}
                  </a>
                  <a href="/" className="text-blue-600 hover:text-blue-800 py-2 transition duration-150 font-medium flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    {translations[selectedLanguage].returnToHome}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  
return (
    <>
      <div className="min-h-screen py-10">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{translations[selectedLanguage].title}</h1>
            {/* <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg p-2"
            >
              {languages.map((lang) => (
                <option key={lang.key} value={lang.key}>{lang.label}</option>
              ))}
            </select> */}
          </div>

          {claims.length > 1 && (
            <div className="bg-white rounded-lg shadow-sm p-2 flex items-center">
              <span className="text-sm text-gray-600 mr-2">{translations[selectedLanguage].claims}</span>
              <div className="flex space-x-1">
                {claims.map((claim, index) => (
                  <button
                    key={claim._id}
                    onClick={() => paginate(index + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${currentPage === index + 1
                      ? `${getStatusColor(claim.status)} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeClaim && (
            <>
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 transform transition-all duration-300 hover:shadow-lg">
                <div className={`h-2 ${getStatusColor(activeClaim.status)}`}></div>
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <div className={`h-4 w-4 rounded-full ${getStatusColor(activeClaim.status)} mr-2`}></div>
                        <h2 className="text-xl font-semibold">{activeClaim.status}</h2>
                      </div>
                      <p className="text-gray-500 mt-1">
                        {translations[selectedLanguage].claimId} <span className="font-medium">{activeClaim._id}</span>
                      </p>
                      <p className="text-gray-500">
                        {translations[selectedLanguage].submittedOn} <span className="font-medium">{formatDate(activeClaim.createdAt)}</span>
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-800">₹{activeClaim.amount.toLocaleString()}</span>
                        <p className="text-gray-500">{translations[selectedLanguage].claimAmount}</p>
                      </div>
                    </div>
                  </div>

                  {activeClaim.status === "Rejected" && (
                    <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <div className="flex">
                        <svg className="h-6 w-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <p className="text-sm text-red-700">{translations[selectedLanguage].rejectedMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeClaim.status === "Approved" && (
                    <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                      <div className="flex">
                        <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <p className="text-sm text-green-700">{translations[selectedLanguage].approvedMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-12 bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-6">{translations[selectedLanguage].claimProgress}</h2>
                <div className="relative">
                  <div className="h-2 bg-gray-200 rounded-full"></div>
                  <div
                    className={`h-2 rounded-full absolute top-0 left-0 ${getStatusColor(activeClaim.status)}`}
                    style={{ width: `${(getStatusStep(activeClaim.status) / 3) * 100}%` }}
                  ></div>
                  <div className="flex justify-between mt-4">
                    <div className="relative text-center">
                      <div className={`h-10 w-10 rounded-full border-4 mx-auto ${getStatusStep(activeClaim.status) >= 1 ? `${getStatusColor(activeClaim.status)} border-white` : 'bg-white border-gray-300'} flex items-center justify-center shadow-md`}>
                        {getStatusStep(activeClaim.status) >= 1 &&
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        }
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-700">{translations[selectedLanguage].pending}</div>
                      <div className="text-xs text-gray-500">{translations[selectedLanguage].claimSubmitted}</div>
                    </div>
                    <div className="relative text-center">
                      <div className={`h-10 w-10 rounded-full border-4 mx-auto ${getStatusStep(activeClaim.status) >= 2 ? `${getStatusColor(activeClaim.status)} border-white` : 'bg-white border-gray-300'} flex items-center justify-center shadow-md`}>
                        {getStatusStep(activeClaim.status) >= 2 &&
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        }
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-700">{translations[selectedLanguage].inReview}</div>
                      <div className="text-xs text-gray-500">{translations[selectedLanguage].verificationProcess}</div>
                    </div>
                    <div className="relative text-center">
                      <div className={`h-10 w-10 rounded-full border-4 mx-auto ${getStatusStep(activeClaim.status) >= 3 ? `${getStatusColor(activeClaim.status)} border-white` : 'bg-white border-gray-300'} flex items-center justify-center shadow-md`}>
                        {getStatusStep(activeClaim.status) >= 3 &&
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        }
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-700">
                        {activeClaim.status === "Approved" || activeClaim.status === "Rejected"
                          ? activeClaim.status
                          : translations[selectedLanguage].finalDecision}
                      </div>
                      <div className="text-xs text-gray-500">{translations[selectedLanguage].finalDecision}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">{translations[selectedLanguage].claimDetails}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        {translations[selectedLanguage].personalInformation}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].name}</span>
                          <span className="font-medium text-gray-800">{activeClaim.name}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].aadhaar}</span>
                          <span className="font-medium text-gray-800">{activeClaim.aadhaar}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].phone}</span>
                          <span className="font-medium text-gray-800">{activeClaim.phone}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].address}</span>
                          <span className="font-medium text-gray-800">{activeClaim.address}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].pincode}</span>
                          <span className="font-medium text-gray-800">{activeClaim.pincode}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        {translations[selectedLanguage].claimInformation}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].claimType}</span>
                          <span className="font-medium text-gray-800">{activeClaim.claimType}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].farmerType}</span>
                          <span className="font-medium text-gray-800">{activeClaim.farmerType}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].causeOfLoss}</span>
                          <span className="font-medium text-gray-800">{activeClaim.causeOfLoss}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].areaImpacted}</span>
                          <span className="font-medium text-gray-800">{activeClaim.areaImpacted}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        </svg>
                        {translations[selectedLanguage].locationDetails}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].state}</span>
                          <span className="font-medium text-gray-800">{activeClaim.state}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].district}</span>
                          <span className="font-medium text-gray-800">{activeClaim.district}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].dateOfSowing}</span>
                          <span className="font-medium text-gray-800">{formatDate(activeClaim.dateOfSowing)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-4m6 2l3.999 11.999M18 5l-3.999 11.999m-6.001 0A5.002 5.002 0 0018 17m-6-14v14"></path>
                        </svg>
                        {translations[selectedLanguage].bankDetails}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].bankName}</span>
                          <span className="font-medium text-gray-800">{activeClaim.bankName}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">{translations[selectedLanguage].accountNumber}</span>
                          <span className="font-medium text-gray-800">{activeClaim.accountNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <a href="/" className="text-blue-600 hover:text-blue-800 py-2 transition duration-150 font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  {translations[selectedLanguage].backToHome}
                </a>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Status;