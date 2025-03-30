import React, { useState, useEffect } from "react";
import { message, DatePicker } from "antd";
import axios from "axios";
import Footer from "./Footer";
import QuickAnimatedLoader from "./CustomLoader";

// Function to load Razorpay script dynamically with delay
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
      setTimeout(() => resolve(true), 500); // 500ms delay
    };
    script.onerror = (error) => {
      console.error("Error loading Razorpay script:", error);
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const ApplyInsuranceForm = () => {
  const [formData, setFormData] = useState({
    aadhar: "",
    name: "",
    state: "",
    district: "",
    pincode: "",
    account: "",
    branch: "",
    ifsc: "",
    mobile: "",
    crop: "",
    dateOfSowing: "",
    areaSown: "",
    season: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [premiumDetails, setPremiumDetails] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [translations, setTranslations] = useState({});
  const [loadingTranslations, setLoadingTranslations] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");

  const districtOptions = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat", "Ziro", "Bomdila"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Raigarh"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    "Haryana": ["Faridabad", "Gurugram", "Hisar", "Rohtak", "Panipat"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Kullu"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Manipur": ["Imphal", "Churachandpur", "Thoubal", "Bishnupur", "Ukhrul"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Saiha", "Kolasib"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Pelling"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    "Tripura": ["Agartala", "Udaipur", "Kailashahar", "Dharmanagar", "Belonia"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh", "Roorkee"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
    "Andaman and Nicobar Islands": ["Port Blair", "Havelock", "Neil Island", "Diglipur", "Mayabunder"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua"],
    "Ladakh": ["Leh", "Kargil"],
    "Lakshadweep": ["Kavaratti", "Minicoy", "Agatti", "Andrott", "Kalpeni"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  };

  const insuranceParams = [
    { crop: "Jute", season: "Kharif", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "20-09-2023" },
    { crop: "Oil Seeds", season: "Rabi", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "25-09-2023" },
    { crop: "Pulses", season: "Kharif", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "20-09-2023" },
    { crop: "Coconut", season: "Annual", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "01-10-2023" },
    { crop: "Mesta", season: "Kharif", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "20-09-2023" },
    { crop: "Sugarcane", season: "Kharif", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "20-09-2023" },
    { crop: "Rubber", season: "Annual", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "01-10-2023" },
    { crop: "Cotton", season: "Kharif", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "20-09-2023" },
    { crop: "Gram", season: "Rabi", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "25-09-2023" },
    { crop: "Mustard", season: "Rabi", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "25-09-2023" },
    { crop: "Maize", season: "Kharif", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "20-09-2023" },
    { crop: "Sesame", season: "Kharif", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "20-09-2023" },
    { crop: "Ragi", season: "Kharif", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "20-09-2023" },
    { crop: "Potato", season: "Rabi", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "25-09-2023" },
    { crop: "Soybean", season: "Kharif", sumInsuredPerHectare: 320000, actuarialRate: 15, cutOffDate: "20-09-2023" },
  ];

  const farmerSharePercentage = {
    Kharif: 2,
    Rabi: 1.5,
    Annual: 5,
  };

  // Texts to translate
  const textsToTranslate = [
    "Apply for Crop Insurance",
    "Submit your application with detailed information below",
    "Review your insurance details below",
    "Personal Details",
    "Bank Details",
    "Crop Details",
    "Contact Details",
    "Aadhar",
    "Name",
    "State",
    "District",
    "Pincode",
    "Account",
    "Branch",
    "IFSC",
    "Mobile",
    "Crop",
    "Date of Sowing",
    "Area Sown (in hectares)",
    "Season",
    "Submit Application",
    "Please fix all errors before submitting",
    "Form submitted successfully!",
    "Failed to submit form. Please try again.",
    "Your Insurance Premium Details",
    "Your Premium Amount",
    "Due by",
    "Insurance Company",
    "Sum Insured Per Hectare",
    "Total Sum Insured",
    "Farmer Share",
    "Actuarial Rate",
    "Premium Paid by Government",
    "Proceed To Pay",
    "Application Submitted Successfully!",
    "Select a state",
    "Select a district",
    "Select a crop",
    "Enter aadhar",
    "Enter name",
    "Enter pincode",
    "Enter account",
    "Enter branch",
    "Enter ifsc",
    "Enter mobile",
    "Enter crop",
    "Enter area sown (in hectares)",
    "Aadhar number is required",
    "Aadhar number must be 12 digits",
    "Aadhar number must contain only digits",
    "State is required",
    "District is required",
    "Pincode is required",
    "Pincode must be 6 digits",
    "Pincode must contain only digits",
    "Account number is required",
    "Account number must be 9-18 digits",
    "Account number must contain only digits",
    "Mobile number is required",
    "Mobile number must be 10 digits",
    "Mobile number must contain only digits",
    "IFSC code is required",
    "Invalid IFSC format (e.g., SBIN0123456)",
    "Name is required",
    "Branch is required",
    "Crop is required",
    "Date of sowing is required",
    "Area sown is required",
    "Area sown must be greater than 0",
    "Season is required",
    "Phone number cannot exceed 10 digits",
    "Phone number must contain only digits",
    "Pincode cannot exceed 6 digits",
    "Area Sown must be a valid number",
    "Account number cannot exceed 18 digits",
    "Aadhaar number cannot exceed 12 digits",
    "Failed to load Razorpay SDK. Please try again.",
    "Razorpay SDK is not available. Please try again.",
    "Premium details not available.",
    "Payment successful!",
    "Payment verification failed.",
    "Payment failed",
    "Failed to initiate payment. Please try again."
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

  const formSections = {
    "Personal Details": ["aadhar", "name", "state", "district", "pincode"],
    "Bank Details": ["account", "branch", "ifsc"],
    "Crop Details": ["crop", "dateOfSowing", "areaSown", "season"],
    "Contact Details": ["mobile"],
  };

  const validationRules = {
    aadhar: (value) => {
      if (!value) return getTranslatedText("Aadhar number is required");
      if (value.length !== 12) return getTranslatedText("Aadhar number must be 12 digits");
      if (!/^\d+$/.test(value)) return getTranslatedText("Aadhar number must contain only digits");
      return "";
    },
    state: (value) => (value ? "" : getTranslatedText("State is required")),
    district: (value) => (value ? "" : getTranslatedText("District is required")),
    pincode: (value) => {
      if (!value) return getTranslatedText("Pincode is required");
      if (value.length !== 6) return getTranslatedText("Pincode must be 6 digits");
      if (!/^\d+$/.test(value)) return getTranslatedText("Pincode must contain only digits");
      return "";
    },
    account: (value) => {
      if (!value) return getTranslatedText("Account number is required");
      if (value.length < 9 || value.length > 18) return getTranslatedText("Account number must be 9-18 digits");
      if (!/^\d+$/.test(value)) return getTranslatedText("Account number must contain only digits");
      return "";
    },
    mobile: (value) => {
      if (!value) return getTranslatedText("Mobile number is required");
      if (value.length !== 10) return getTranslatedText("Mobile number must be 10 digits");
      if (!/^\d+$/.test(value)) return getTranslatedText("Mobile number must contain only digits");
      return "";
    },
    ifsc: (value) => {
      if (!value) return getTranslatedText("IFSC code is required");
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) return getTranslatedText("Invalid IFSC format (e.g., SBIN0123456)");
      return "";
    },
    name: (value) => (value ? "" : getTranslatedText("Name is required")),
    branch: (value) => (value ? "" : getTranslatedText("Branch is required")),
    crop: (value) => (value ? "" : getTranslatedText("Crop is required")),
    dateOfSowing: (value) => (value ? "" : getTranslatedText("Date of sowing is required")),
    areaSown: (value) => {
      if (!value) return getTranslatedText("Area sown is required");
      if (parseFloat(value) <= 0) return getTranslatedText("Area sown must be greater than 0");
      return "";
    },
    season: (value) => (value ? "" : getTranslatedText("Season is required")),
  };

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
  }, [selectedLanguage]);

  const getTranslatedText = (englishText) => {
    return translations[englishText] || englishText;
  };

  const validateField = (name, value) => {
    const validationRule = validationRules[name];
    return validationRule ? validationRule(value) : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "state") {
      setFormData((prev) => ({ ...prev, state: value, district: "" }));
      setTouchedFields((prev) => ({ ...prev, state: true }));
      setErrors((prev) => ({ ...prev, state: validateField("state", value) }));
      return;
    }

    if (name === "crop") {
      const selectedCrop = insuranceParams.find((param) => param.crop === value);
      if (selectedCrop) {
        setFormData((prev) => ({ ...prev, crop: value, season: selectedCrop.season }));
      }
      return;
    }

    if (name === "mobile") {
      if (value.length > 10) {
        messageApi.warning(getTranslatedText("Phone number cannot exceed 10 digits"));
        return;
      }
      if (!/^\d*$/.test(value)) {
        messageApi.warning(getTranslatedText("Phone number must contain only digits"));
        return;
      }
    } else if (name === "pincode") {
      if (value.length > 6) {
        messageApi.warning(getTranslatedText("Pincode cannot exceed 6 digits"));
        return;
      }
      if (!/^\d*$/.test(value)) {
        messageApi.warning(getTranslatedText("Pincode must contain only digits"));
        return;
      }
    } else if (name === "areaSown") {
      if (!/^\d*\.?\d*$/.test(value)) {
        messageApi.warning(getTranslatedText("Area Sown must be a valid number"));
        return;
      }
    } else if (name === "account") {
      if (value.length > 18) {
        messageApi.warning(getTranslatedText("Account number cannot exceed 18 digits"));
        return;
      }
      if (!/^\d*$/.test(value)) {
        messageApi.warning(getTranslatedText("Account number must contain only digits"));
        return;
      }
    } else if (name === "aadhar") {
      if (value.length > 12) {
        messageApi.warning(getTranslatedText("Aadhaar number cannot exceed 12 digits"));
        return;
      }
      if (!/^\d*$/.test(value)) {
        messageApi.warning(getTranslatedText("Aadhaar number must contain only digits"));
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (touchedFields[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prev) => ({ ...prev, dateOfSowing: dateString }));
    setTouchedFields((prev) => ({ ...prev, dateOfSowing: true }));
    setErrors((prev) => ({ ...prev, dateOfSowing: validateField("dateOfSowing", dateString) }));
  };

  const handleLanguageSelect = (languageKey) => {
    localStorage.setItem("selectedLanguage", languageKey);
    setSelectedLanguage(languageKey);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculatePremium = () => {
    const areaValue = parseFloat(formData.areaSown);
    const { crop, season } = formData;

    const selectedCropParams = insuranceParams.find((param) => param.crop === crop && param.season === season);

    if (selectedCropParams) {
      const { sumInsuredPerHectare, actuarialRate, cutOffDate } = selectedCropParams;

      const farmerShare = farmerSharePercentage[season];
      const premiumPaidByFarmer = sumInsuredPerHectare * areaValue * (farmerShare / 100);
      const premiumPaidByGovt = sumInsuredPerHectare * areaValue * ((actuarialRate - farmerShare) / 100);
      const totalSumInsured = sumInsuredPerHectare * areaValue;

      return {
        insuranceCompany: "Agriculture Insurance Company",
        sumInsuredPerHectare,
        farmerShare,
        actuarialRate,
        cutOffDate,
        crop,
        season,
        area: areaValue,
        premiumPaidByFarmer,
        premiumPaidByGovt,
        totalSumInsured,
      };
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouchedFields(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length > 0) {
      messageApi.error(getTranslatedText("Please fix all errors before submitting"));
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/submit", formData);
      if (response.status === 200) {
        setShowSuccess(true);
        messageApi.success(getTranslatedText("Form submitted successfully!"));
        const premium = calculatePremium();
        setPremiumDetails(premium);
        setIsSubmitted(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        messageApi.error(getTranslatedText("Failed to submit form. Please try again."));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      messageApi.error(getTranslatedText("Failed to submit form. Please try again."));
    }
  };

  const handleReset = () => {
    setFormData({
      aadhar: "",
      name: "",
      state: "",
      district: "",
      pincode: "",
      account: "",
      branch: "",
      ifsc: "",
      mobile: "",
      crop: "",
      dateOfSowing: "",
      areaSown: "",
      season: "",
    });
    setErrors({});
    setTouchedFields({});
    setPremiumDetails(null);
    setIsSubmitted(false);
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      messageApi.error(getTranslatedText("Failed to load Razorpay SDK. Please try again."));
      return;
    }

    if (!window.Razorpay) {
      messageApi.error(getTranslatedText("Razorpay SDK is not available. Please try again."));
      console.error("window.Razorpay is undefined");
      return;
    }

    if (!premiumDetails) {
      messageApi.error(getTranslatedText("Premium details not available."));
      return;
    }

    try {
      console.log("Creating order with amount:", premiumDetails.premiumPaidByFarmer);
      const response = await axios.post("http://localhost:5000/api/create-order", {
        amount: premiumDetails.premiumPaidByFarmer,
      });

      console.log("Order response:", response.data);
      const { orderId, amount, currency, key } = response.data;

      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: getTranslatedText("Crop Insurance"),
        description: `${getTranslatedText("Premium payment for")} ${premiumDetails.crop}`,
        order_id: orderId,
        handler: async (response) => {
          console.log("Payment response:", response);
          try {
            const verifyResponse = await axios.post("http://localhost:5000/api/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log("Verification response:", verifyResponse.data);
            if (verifyResponse.data.status === "success") {
              messageApi.success(getTranslatedText("Payment successful!"));
              handleReset();
            } else {
              messageApi.error(getTranslatedText("Payment verification failed."));
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            messageApi.error(getTranslatedText("Payment verification failed."));
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.mobile,
        },
        theme: {
          color: "#10B981",
        },
      };

      console.log("Razorpay options:", options);
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);
        messageApi.error(`${getTranslatedText("Payment failed")}: ${response.error.description}`);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      messageApi.error(getTranslatedText("Failed to initiate payment. Please try again."));
    }
  };

  if (loadingTranslations) {
    <QuickAnimatedLoader />
  }

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
        {contextHolder}



        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800 p-8 sticky top-0 z-20 shadow-lg">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-10 animate-pulse-slow"></div>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-extrabold text-center text-white mb-3 animate-slideDown tracking-tight">
              {getTranslatedText("Apply for Crop Insurance")}
            </h2>
            <p className="text-center text-green-100 text-lg md:text-xl animate-fadeInUp">
              {isSubmitted
                ? getTranslatedText("Review your insurance details below")
                : getTranslatedText("Submit your application with detailed information below")}
            </p>
          </div>
        </div>

        {/* Conditional Rendering: Form or Premium Details */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6 md:p-8">
            {Object.entries(formSections).map(([section, fields], index) => (
              <div key={section} className="mb-12 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-lg shadow-sm transform transition-all hover:-translate-y-1 hover:shadow-md">
                  {getTranslatedText(section)}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {fields.map((key) => (
                    <div key={key} className="relative group">
                      <label className="block text-base font-semibold text-gray-700 mb-2 transition-all duration-300 group-hover:text-emerald-600 group-hover:scale-105 origin-left">
                        {getTranslatedText(
                          key === "areaSown" ? "Area Sown (in hectares)" : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
                        )}
                      </label>
                      {key === "state" ? (
                        <select
                          name={key}
                          value={formData.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"} bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300 appearance-none`}
                        >
                          <option value="">{getTranslatedText("Select a state")}</option>
                          {Object.keys(districtOptions).sort().map((stateName) => (
                            <option key={stateName} value={stateName}>{stateName}</option>
                          ))}
                        </select>
                      ) : key === "district" ? (
                        <select
                          name={key}
                          value={formData.district}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!formData.state}
                          className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"} bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300 appearance-none`}
                        >
                          <option value="">{getTranslatedText("Select a district")}</option>
                          {formData.state &&
                            districtOptions[formData.state]?.map((districtName) => (
                              <option key={districtName} value={districtName}>{districtName}</option>
                            ))}
                        </select>
                      ) : key === "crop" ? (
                        <select
                          name={key}
                          value={formData.crop}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"} bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300 appearance-none`}
                        >
                          <option value="">{getTranslatedText("Select a crop")}</option>
                          {insuranceParams.map((param) => (
                            <option key={param.crop} value={param.crop}>{param.crop}</option>
                          ))}
                        </select>
                      ) : key === "season" ? (
                        <input
                          type="text"
                          name={key}
                          value={formData.season}
                          readOnly
                          className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"} bg-gray-100/80 backdrop-blur-sm shadow-md transition-all duration-300`}
                        />
                      ) : key === "dateOfSowing" ? (
                        <DatePicker
                          onChange={handleDateChange}
                          className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"} bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300`}
                          placeholder={getTranslatedText("Select date of sowing")}
                        />
                      ) : (
                        <input
                          type="text"
                          name={key}
                          required
                          value={formData[key]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"} bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300`}
                          placeholder={
                            key === "areaSown"
                              ? getTranslatedText("Enter area sown (in hectares)")
                              : getTranslatedText(`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`)
                          }
                        />
                      )}
                      {touchedFields[key] && errors[key] && (
                        <p className="absolute -bottom-6 left-2 text-sm text-red-500 animate-bounceIn font-medium">{errors[key]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-center py-12">
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 relative overflow-hidden group"
              >
                <span className="relative z-10">{getTranslatedText("Submit Application")}</span>
                <span className="absolute inset-0 bg-green-800 opacity-0 group-hover:opacity-30 animate-scaleIn transition-opacity duration-300"></span>
                <span className="absolute top-0 left-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500"></span>
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-7xl mx-auto p-6 md:p-8 animate-fadeIn">
            {premiumDetails && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
                <h2 className="text-4xl font-extrabold text-emerald-800 mb-8 text-center relative z-10">
                  {getTranslatedText("Your Insurance Premium Details")}
                </h2>

                {/* Hero Section - Premium Paid by Farmer */}
                <div className="relative z-10 mb-10">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 rounded-xl shadow-lg transform hover:scale-102 transition-all duration-300">
                    <div className="text-center">
                      <h3 className="text-white text-xl font-medium mb-2">{getTranslatedText("Your Premium Amount")}</h3>
                      <div className="text-4xl font-bold text-white mb-1">
                        {formatCurrency(premiumDetails.premiumPaidByFarmer)}
                      </div>
                      <p className="text-emerald-100 text-sm">
                        {getTranslatedText("Due by")}: {premiumDetails.cutOffDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {[
                      { label: "Insurance Company", value: premiumDetails.insuranceCompany },
                      { label: "Crop", value: premiumDetails.crop },
                      { label: "Season", value: premiumDetails.season },
                      { label: "Area (Hectares)", value: premiumDetails.area },
                      { label: "Sum Insured Per Hectare", value: formatCurrency(premiumDetails.sumInsuredPerHectare) },
                      { label: "Total Sum Insured", value: formatCurrency(premiumDetails.totalSumInsured) },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-emerald-100/50 rounded-lg shadow-sm hover:bg-emerald-200/70 transition-all duration-300"
                      >
                        <span className="font-semibold text-gray-700">{getTranslatedText(item.label)}:</span>
                        <span className="text-emerald-800 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  {/* Right Column */}
                  <div className="space-y-4">
                    {[
                      { label: "Farmer Share", value: `${premiumDetails.farmerShare}%` },
                      { label: "Actuarial Rate", value: `${premiumDetails.actuarialRate}%` },
                      { label: "Premium Paid by Government", value: formatCurrency(premiumDetails.premiumPaidByGovt) },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-emerald-100/50 rounded-lg shadow-sm hover:bg-emerald-200/70 transition-all duration-300"
                      >
                        <span className="font-semibold text-gray-700">{getTranslatedText(item.label)}:</span>
                        <span className="text-emerald-800 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Pay Button */}
                <div className="flex justify-center mt-10 relative z-10">
                  <button
                    onClick={handlePayment}
                    className="px-10 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">{getTranslatedText("Proceed To Pay")}</span>
                    <span className="absolute inset-0 bg-teal-700 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl animate-bounceIn flex items-center z-50">
            <svg className="w-7 h-7 mr-3 animate-spinSlow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-lg font-semibold">{getTranslatedText("Application Submitted Successfully!")}</span>
          </div>
        )}

        {/* Decorative Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplyInsuranceForm;