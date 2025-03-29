import React, { useState, useEffect } from "react";
import { message, DatePicker } from "antd";
import axios from "axios";

const Complain = () => {
  const [formData, setFormData] = useState({
    name: "",
    claimType: "",
    farmerType: "",
    amount: "",
    phone: "",
    state: "",
    district: "",
    bankName: "",
    bankBranch: "",
    accountNumber: "",
    address: "",
    pincode: "",
    areaImpacted: "",
    causeOfLoss: "",
    aadhaar: "",
    sowingDate: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [touchedFields, setTouchedFields] = useState({});
  const [translations, setTranslations] = useState({});
  const [loadingTranslations, setLoadingTranslations] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");

  // Texts to translate
  const textsToTranslate = [
    "Report Crop Loss",
    "Submit your claim with detailed information below",
    "Personal Details",
    "Farm Information",
    "Claim Details",
    "Bank Details",
    "Name",
    "Phone",
    "Address",
    "Pincode",
    "Aadhaar",
    "Farmer Type",
    "Area Impacted",
    "Cause Of Loss",
    "Claim Type",
    "Amount",
    "State",
    "District",
    "Bank Name",
    "Bank Branch",
    "Account Number",
    "Submit Claim",
    "Claim Submitted Successfully!",
    "Select Claim Type",
    "Select Farmer Type",
    "Select State",
    "Select Cause Of Loss",
    "Select District",
    "Enter name",
    "Enter phone",
    "Enter address",
    "Enter pincode",
    "Enter aadhaar",
    "Enter area impacted",
    "Enter amount",
    "Enter district",
    "Enter bank name",
    "Enter bank branch",
    "Enter account number",
    "Phone number is required",
    "Phone number must be 10 digits",
    "Phone number must contain only digits",
    "Phone number cannot exceed 10 digits",
    "Amount is required",
    "Amount must be greater than 0",
    "This field must contain only digits",
    "Pincode is required",
    "Pincode must be 6 digits",
    "Pincode must contain only digits",
    "Pincode cannot exceed 6 digits",
    "Account number is required",
    "Account number must be at least 9 digits",
    "Account number cannot exceed 18 digits",
    "Account number must contain only digits",
    "Bank name is required",
    "Bank branch is required",
    "Address must be at least 5 characters",
    "District is required",
    "State is required",
    "Claim type is required",
    "Farmer type is required",
    "Cause of loss is required",
    "Area impacted is required",
    "Area impacted must be greater than 0",
    "Aadhaar number is required",
    "Aadhaar number must be 12 digits",
    "Aadhaar number must contain only digits",
    "Aadhaar number cannot exceed 12 digits",
    "Please fix all errors before submitting",
    "Complaint submitted successfully!",
    "Failed to submit complaint",
    "Date of sowing",
    "Date of sowing is required",
    "Enter date of sowing",
  ];

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

  const validationRules = {
    phone: (value) => {
      if (!value) return getTranslatedText("Phone number is required");
      if (value.length !== 10) return getTranslatedText("Phone number must be 10 digits");
      if (!/^\d+$/.test(value)) return getTranslatedText("Phone number must contain only digits");
      return "";
    },
    amount: (value) => {
      if (!value) return getTranslatedText("Amount is required");
      if (parseInt(value) <= 0) return getTranslatedText("Amount must be greater than 0");
      return "";
    },
    pincode: (value) => {
      if (!value) return getTranslatedText("Pincode is required");
      if (value.length !== 6) return getTranslatedText("Pincode must be 6 digits");
      if (!/^\d+$/.test(value)) return getTranslatedText("Pincode must contain only digits");
      return "";
    },
    accountNumber: (value) => {
      if (!value) return getTranslatedText("Account number is required");
      if (value.length < 9) return getTranslatedText("Account number must be at least 9 digits");
      if (value.length > 18) return getTranslatedText("Account number cannot exceed 18 digits");
      if (!/^\d+$/.test(value)) return getTranslatedText("Account number must contain only digits");
      return "";
    },
    bankName: (value) => (value ? "" : getTranslatedText("Bank name is required")),
    bankBranch: (value) => (value ? "" : getTranslatedText("Bank branch is required")),
    address: (value) => (value.length >= 5 ? "" : getTranslatedText("Address must be at least 5 characters")),
    district: (value) => (value ? "" : getTranslatedText("District is required")),
    state: (value) => (value ? "" : getTranslatedText("State is required")),
    claimType: (value) => (value ? "" : getTranslatedText("Claim type is required")),
    farmerType: (value) => (value ? "" : getTranslatedText("Farmer type is required")),
    causeOfLoss: (value) => (value ? "" : getTranslatedText("Cause of loss is required")),
    areaImpacted: (value) => {
      if (!value) return getTranslatedText("Area impacted is required");
      if (parseInt(value) <= 0) return getTranslatedText("Area impacted must be greater than 0");
      return "";
    },
    aadhaar: (value) => {
      if (!value) return getTranslatedText("Aadhaar number is required");
      if (value.length !== 12) return getTranslatedText("Aadhaar number must be 12 digits");
      if (!/^\d+$/.test(value)) return getTranslatedText("Aadhaar number must contain only digits");
      return "";
    },
    sowingDate: (value) => (value ? "" : getTranslatedText("Date of sowing is required")),
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
          return { [text]: response.data.translation };
        } catch (error) {
          console.error(`Error fetching translation for ${text}:`, error.message);
          return { [text]: text }; // Fallback to original text
        }
      });

      try {
        const results = await Promise.all(translationPromises);
        const translationMap = Object.assign({}, ...results);
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

    const handleStorageChange = (e) => {
      if (e.key === "selectedLanguage") {
        setSelectedLanguage(e.newValue || "en");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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

    if (name === "phone") {
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
    } else if (name === "amount" || name === "areaImpacted") {
      if (!/^\d*$/.test(value)) {
        messageApi.warning(getTranslatedText("This field must contain only digits"));
        return;
      }
    } else if (name === "accountNumber") {
      if (value.length > 18) {
        messageApi.warning(getTranslatedText("Account number cannot exceed 18 digits"));
        return;
      }
      if (!/^\d*$/.test(value)) {
        messageApi.warning(getTranslatedText("Account number must contain only digits"));
        return;
      }
    } else if (name === "aadhaar") {
      if (value.length > 12) {
        messageApi.warning(getTranslatedText("Aadhaar number cannot exceed 12 digits"));
        return;
      }
      if (!/^\d*$/.test(value)) {
        messageApi.warning(getTranslatedText("Aadhaar number must contain only digits"));
        return;
      }
    } else if (name === "state") {
      // Reset district when state changes
      setFormData((prev) => ({ ...prev, state: value, district: "" }));
      setErrors((prev) => ({ ...prev, district: getTranslatedText("District is required") }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prev) => ({ ...prev, sowingDate: dateString }));
    setTouchedFields((prev) => ({ ...prev, sowingDate: true }));
    const error = validateField("sowingDate", dateString);
    setErrors((prev) => ({
      ...prev,
      sowingDate: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouchedFields(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length > 0) {
      messageApi.error(getTranslatedText("Please fix all errors before submitting"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/complain", formData);
      messageApi.success(response.data.message || getTranslatedText("Complaint submitted successfully!"));
      setShowSuccess(true);

      setFormData({
        name: "",
        claimType: "",
        farmerType: "",
        amount: "",
        phone: "",
        state: "",
        district: "",
        bankName: "",
        bankBranch: "",
        accountNumber: "",
        address: "",
        pincode: "",
        areaImpacted: "",
        causeOfLoss: "",
        aadhaar: "",
        sowingDate: "",
      });

      setErrors({});
      setTouchedFields({});
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      messageApi.error(error.response?.data?.error || getTranslatedText("Failed to submit complaint"));
    }
  };

  const formSections = {
    "Personal Details": ["name", "phone", "address", "pincode", "aadhaar"],
    "Farm Information": ["farmerType", "areaImpacted", "causeOfLoss", "sowingDate"],
    "Claim Details": ["claimType", "amount", "state", "district"],
    "Bank Details": ["bankName", "bankBranch", "accountNumber"],
  };

  if (loadingTranslations) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      {contextHolder}
      <div className="bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800 p-8 sticky top-0 z-20 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-10 animate-pulse-slow"></div>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold text-center text-white mb-3 animate-slideDown tracking-tight">
            {getTranslatedText("Report Crop Loss")}
          </h2>
          <p className="text-center text-green-100 text-lg md:text-xl animate-fadeInUp">
            {getTranslatedText("Submit your claim with detailed information below")}
          </p>
        </div>
      </div>

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
                    {getTranslatedText(key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()))}
                  </label>
                  {["claimType", "farmerType", "state", "causeOfLoss", "district"].includes(key) ? (
                    <select
                      name={key}
                      required
                      value={formData[key]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"} bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300 appearance-none`}
                    >
                      <option value="">
                        {getTranslatedText(`Select ${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}`)}
                      </option>
                      {key === "claimType" &&
                        ["Farm Vehicle Replacement", "Irrigation System Maintenance", "Farm Liability Insurance", "Agricultural Building Repair"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      {key === "farmerType" &&
                        ["Small", "Semi-Medium", "Medium", "Large"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      {key === "state" &&
                        Object.keys(districtOptions).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      {key === "causeOfLoss" &&
                        ["Drought", "Flood", "Frost", "Hailstorm", "Windstorm", "Excessive Heat", "Excessive Rainfall"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      {key === "district" &&
                        formData.state &&
                        districtOptions[formData.state].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  ) : key === "sowingDate" ? (
                    <DatePicker
                      onChange={handleDateChange}
                      className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"} bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300`}
                      placeholder={getTranslatedText("Enter date of sowing")}
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
                      placeholder={getTranslatedText(`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`)}
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

        <div className="flex justify-center py-12">
          <button
            type="submit"
            className="px-12 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 relative overflow-hidden group"
          >
            <span className="relative z-10">{getTranslatedText("Submit Claim")}</span>
            <span className="absolute inset-0 bg-green-800 opacity-0 group-hover:opacity-30 animate-scaleIn transition-opacity duration-300"></span>
            <span className="absolute top-0 left-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500"></span>
          </button>
        </div>
      </form>

      {showSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl animate-bounceIn flex items-center z-50">
          <svg className="w-7 h-7 mr-3 animate-spinSlow" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-lg font-semibold">{getTranslatedText("Claim Submitted Successfully!")}</span>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Complain;