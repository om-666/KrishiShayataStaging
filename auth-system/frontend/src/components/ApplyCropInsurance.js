import React, { useState } from "react";
import { message, DatePicker } from "antd";
import axios from "axios";

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
        reason: "",
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

    const formSections = {
        "Personal Details": ["aadhar", "name", "state", "district", "pincode"],
        "Bank Details": ["account", "branch", "ifsc"],
        "Crop Details": ["crop", "reason", "dateOfSowing", "areaSown", "season"],
        "Contact Details": ["mobile"],
    };

    const validationRules = {
        aadhar: (value) => {
            if (!value) return "Aadhar number is required";
            if (value.length !== 12) return "Aadhar number must be 12 digits";
            if (!/^\d+$/.test(value)) return "Aadhar number must contain only digits";
            return "";
        },
        state: (value) => (value ? "" : "State is required"),
        district: (value) => (value ? "" : "District is required"),
        pincode: (value) => {
            if (!value) return "Pincode is required";
            if (value.length !== 6) return "Pincode must be 6 digits";
            if (!/^\d+$/.test(value)) return "Pincode must contain only digits";
            return "";
        },
        account: (value) => {
            if (!value) return "Account number is required";
            if (value.length < 9 || value.length > 18) return "Account number must be 9-18 digits";
            if (!/^\d+$/.test(value)) return "Account number must contain only digits";
            return "";
        },
        mobile: (value) => {
            if (!value) return "Mobile number is required";
            if (value.length !== 10) return "Mobile number must be 10 digits";
            if (!/^\d+$/.test(value)) return "Mobile number must contain only digits";
            return "";
        },
        ifsc: (value) => {
            if (!value) return "IFSC code is required";
            if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) return "Invalid IFSC format (e.g., SBIN0123456)";
            return "";
        },
        name: (value) => (value ? "" : "Name is required"),
        branch: (value) => (value ? "" : "Branch is required"),
        crop: (value) => (value ? "" : "Crop is required"),
        reason: (value) => (value ? "" : "Reason is required"),
        dateOfSowing: (value) => (value ? "" : "Date of sowing is required"),
        areaSown: (value) => {
            if (!value) return "Area sown is required";
            if (parseFloat(value) <= 0) return "Area sown must be greater than 0";
            return "";
        },
        season: (value) => (value ? "" : "Season is required"),
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

        if (name === "reason") {
            setFormData((prev) => ({ ...prev, reason: value }));
            if (touchedFields[name]) {
                setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
            }
            return;
        }

        if (name === "mobile") {
            if (value.length > 10) {
                messageApi.warning("Phone number cannot exceed 10 digits");
                return;
            }
            if (!/^\d*$/.test(value)) {
                messageApi.warning("Phone number must contain only digits");
                return;
            }
        } else if (name === "pincode") {
            if (value.length > 6) {
                messageApi.warning("Pincode cannot exceed 6 digits");
                return;
            }
            if (!/^\d*$/.test(value)) {
                messageApi.warning("Pincode must contain only digits");
                return;
            }
        } else if (name === "areaSown") {
            if (!/^\d*$/.test(value)) {
                messageApi.warning("Area Sown must contain only digits");
                return;
            }
        } else if (name === "account") {
            if (value.length > 18) {
                messageApi.warning("Account number cannot exceed 18 digits");
                return;
            }
            if (!/^\d*$/.test(value)) {
                messageApi.warning("Account number must contain only digits");
                return;
            }
        } else if (name === "aadhar") {
            if (value.length > 12) {
                messageApi.warning("Aadhaar number cannot exceed 12 digits");
                return;
            }
            if (!/^\d*$/.test(value)) {
                messageApi.warning("Aadhaar number must contain only digits");
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
            messageApi.error("Please fix all errors before submitting");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/submit", formData);
            if (response.status === 200) {
                setShowSuccess(true);
                messageApi.success("Form submitted successfully!");
                const premium = calculatePremium();
                setPremiumDetails(premium);
                setIsSubmitted(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                messageApi.error("Failed to submit form. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            messageApi.error("Failed to submit form. Please try again.");
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
            reason: "",
            dateOfSowing: "",
            areaSown: "",
            season: "",
        });
        setErrors({});
        setTouchedFields({});
        setPremiumDetails(null);
        setIsSubmitted(false);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
            {contextHolder}

            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800 p-8 sticky top-0 z-20 shadow-lg">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-10 animate-pulse-slow"></div>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-center text-white mb-3 animate-slideDown tracking-tight">
                        Apply for Crop Insurance
                    </h2>
                    <p className="text-center text-green-100 text-lg md:text-xl animate-fadeInUp">
                        {isSubmitted ? "Review your insurance details below" : "Submit your application with detailed information below"}
                    </p>
                </div>
            </div>

            {/* Conditional Rendering: Form or Premium Details */}
            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6 md:p-8">
                    {Object.entries(formSections).map(([section, fields], index) => (
                        <div key={section} className="mb-12 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                            <h3 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-lg shadow-sm transform transition-all hover:-translate-y-1 hover:shadow-md">
                                {section}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {fields.map((key) => (
                                    <div key={key} className="relative group">
                                        <label className="block text-base font-semibold text-gray-700 mb-2 transition-all duration-300 group-hover:text-emerald-600 group-hover:scale-105 origin-left">
                                            {key === "areaSown" ? "Area Sown (in hectares)" : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                        </label>
                                        {key === "state" ? (
                                            <select
                                                name={key}
                                                value={formData.state}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"
                                                    } bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300 appearance-none`}
                                            >
                                                <option value="">Select a state</option>
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
                                                className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"
                                                    } bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300 appearance-none`}
                                            >
                                                <option value="">Select a district</option>
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
                                                className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"
                                                    } bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300 appearance-none`}
                                            >
                                                <option value="">Select a crop</option>
                                                {insuranceParams.map((param) => (
                                                    <option key={param.crop} value={param.crop}>{param.crop}</option>
                                                ))}
                                            </select>
                                        ) : key === "reason" ? (
                                            <select
                                                name={key}
                                                value={formData.reason}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"
                                                    } bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300 appearance-none`}
                                            >
                                                <option value="">Select a reason</option>
                                                <option value="Drought">Drought</option>
                                                <option value="Flood">Flood</option>
                                                <option value="Excessive Snow">Excessive Snow</option>
                                            </select>
                                        ) : key === "season" ? (
                                            <input
                                                type="text"
                                                name={key}
                                                value={formData.season}
                                                readOnly
                                                className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"
                                                    } bg-gray-100/80 backdrop-blur-sm shadow-md transition-all duration-300`}
                                            />
                                        ) : key === "dateOfSowing" ? (
                                            <DatePicker
                                                onChange={handleDateChange}
                                                className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"
                                                    } bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300`}
                                                placeholder="Select date of sowing"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                name={key}
                                                required
                                                value={formData[key]}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? "border-red-400 shadow-red-100" : "border-emerald-200"
                                                    } bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300`}
                                                placeholder={
                                                    key === "areaSown" ? "Enter area sown (in hectares)" : `Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`
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
                            <span className="relative z-10">Submit Application</span>
                            <span className="absolute inset-0 bg-green-800 opacity-0 group-hover:opacity-30 animate-scaleIn transition-opacity duration-300"></span>
                            <span className="absolute top-0 left-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500"></span>
                        </button>
                    </div>
                </form>
            ) : (
                <div className="max-w-7xl mx-auto p-6 md:p-8 animate-fadeIn">
                    {/* Enhanced Premium Details Display */}
                    {premiumDetails && (
                        <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
                            <h2 className="text-4xl font-extrabold text-emerald-800 mb-8 text-center relative z-10">Your Insurance Premium Details</h2>

                            {/* Hero Section - Premium Paid by Farmer */}
                            <div className="relative z-10 mb-10">
                                <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 rounded-xl shadow-lg transform hover:scale-102 transition-all duration-300">
                                    <div className="text-center">
                                        <h3 className="text-white text-xl font-medium mb-2">Your Premium Amount</h3>
                                        <div className="text-4xl font-bold text-white mb-1">
                                            {formatCurrency(premiumDetails.premiumPaidByFarmer)}
                                        </div>
                                        <p className="text-emerald-100 text-sm">Due by: {premiumDetails.cutOffDate}</p>
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
                                            <span className="font-semibold text-gray-700">{item.label}:</span>
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
                                            <span className="font-semibold text-gray-700">{item.label}:</span>
                                            <span className="text-emerald-800 font-medium">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Pay Button */}
                            <div className="flex justify-center mt-10 relative z-10">
                                <button
                                    onClick={{}}
                                    className="px-10 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300 relative overflow-hidden group"
                                >
                                    <span className="relative z-10">Proceed To Pay</span>
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
                    <span className="text-lg font-semibold">Application Submitted Successfully!</span>
                </div>
            )}

            {/* Decorative Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
        </div>
    );
};

export default ApplyInsuranceForm;