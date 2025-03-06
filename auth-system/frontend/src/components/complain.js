import React, { useState } from "react";
import { message } from 'antd';
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
        aadhaar: "" // Added Aadhaar field
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [touchedFields, setTouchedFields] = useState({});

    const validationRules = {
        phone: (value) => {
            if (!value) return "Phone number is required";
            if (value.length !== 10) return "Phone number must be 10 digits";
            if (!/^\d+$/.test(value)) return "Phone number must contain only digits";
            return "";
        },
        amount: (value) => {
            if (!value) return "Amount is required";
            if (parseInt(value) <= 0) return "Amount must be greater than 0";
            return "";
        },
        pincode: (value) => {
            if (!value) return "Pincode is required";
            if (value.length !== 6) return "Pincode must be 6 digits";
            if (!/^\d+$/.test(value)) return "Pincode must contain only digits";
            return "";
        },
        accountNumber: (value) => {
            if (!value) return "Account number is required";
            if (value.length < 9) return "Account number must be at least 9 digits";
            if (value.length > 18) return "Account number cannot exceed 18 digits";
            if (!/^\d+$/.test(value)) return "Account number must contain only digits";
            return "";
        },
        bankName: (value) => value ? "" : "Bank name is required",
        bankBranch: (value) => value ? "" : "Bank branch is required",
        address: (value) => value.length >= 5 ? "" : "Address must be at least 5 characters",
        district: (value) => value ? "" : "District is required",
        state: (value) => value ? "" : "State is required",
        claimType: (value) => value ? "" : "Claim type is required",
        farmerType: (value) => value ? "" : "Farmer type is required",
        causeOfLoss: (value) => value ? "" : "Cause of loss is required",
        areaImpacted: (value) => {
            if (!value) return "Area impacted is required";
            if (parseInt(value) <= 0) return "Area impacted must be greater than 0";
            return "";
        },
        aadhaar: (value) => { // Validation for Aadhaar
            if (!value) return "Aadhaar number is required";
            if (value.length !== 12) return "Aadhaar number must be 12 digits";
            if (!/^\d+$/.test(value)) return "Aadhaar number must contain only digits";
            return "";
        }
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
                messageApi.warning('Phone number cannot exceed 10 digits');
                return;
            }
            if (!/^\d*$/.test(value)) {
                messageApi.warning('Phone number must contain only digits');
                return;
            }
        }
        else if (name === "pincode") {
            if (value.length > 6) {
                messageApi.warning('Pincode cannot exceed 6 digits');
                return;
            }
            if (!/^\d*$/.test(value)) {
                messageApi.warning('Pincode must contain only digits');
                return;
            }
        }
        else if (name === "amount" || name === "areaImpacted") {
            if (!/^\d*$/.test(value)) {
                messageApi.warning('This field must contain only digits');
                return;
            }
        }
        else if (name === "accountNumber") {
            if (value.length > 18) {
                messageApi.warning('Account number cannot exceed 18 digits');
                return;
            }
            if (!/^\d*$/.test(value)) {
                messageApi.warning('Account number must contain only digits');
                return;
            }
        }
        else if (name === "aadhaar") { // Handling Aadhaar input
            if (value.length > 12) {
                messageApi.warning('Aadhaar number cannot exceed 12 digits');
                return;
            }
            if (!/^\d*$/.test(value)) {
                messageApi.warning('Aadhaar number must contain only digits');
                return;
            }
        }

        setFormData(prev => ({ ...prev, [name]: newValue }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);
        setTouchedFields(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

        if (Object.keys(newErrors).length > 0) {
            messageApi.error('Please fix all errors before submitting');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axios.post("http://localhost:5000/api/complain", formData);
            messageApi.success(response.data.message || "Complaint submitted successfully!");
            setShowSuccess(true);

            // Reset form
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
                aadhaar: "" // Reset Aadhaar field
            });

            setErrors({});
            setTouchedFields({});
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            messageApi.error(error.response?.data?.error || "Failed to submit complaint");
        }
    };

    const formSections = {
        "Personal Details": ["name", "phone", "address", "pincode", "aadhaar"], // Added Aadhaar to Personal Details
        "Farm Information": ["farmerType", "areaImpacted", "causeOfLoss"],
        "Claim Details": ["claimType", "amount", "state", "district"],
        "Bank Details": ["bankName", "bankBranch", "accountNumber"]
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
            {contextHolder}
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800 p-8 sticky top-0 z-20 shadow-lg">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-10 animate-pulse-slow"></div>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-center text-white mb-3 animate-slideDown tracking-tight">
                        Report Crop Loss
                    </h2>
                    <p className="text-center text-green-100 text-lg md:text-xl animate-fadeInUp">
                        Submit your claim with detailed information below
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6 md:p-8">
                {Object.entries(formSections).map(([section, fields], index) => (
                    <div
                        key={section}
                        className="mb-12 animate-fadeIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <h3 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-lg shadow-sm transform transition-all hover:-translate-y-1 hover:shadow-md">
                            {section}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {fields.map((key) => (
                                <div key={key} className="relative group">
                                    <label className="block text-base font-semibold text-gray-700 mb-2 transition-all duration-300 group-hover:text-emerald-600 group-hover:scale-105 origin-left">
                                        {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                                    </label>
                                    {["claimType", "farmerType", "state", "causeOfLoss"].includes(key) ? (
                                        <select
                                            name={key}
                                            required
                                            value={formData[key]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? 'border-red-400 shadow-red-100' : 'border-emerald-200'} bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300 appearance-none`}
                                        >
                                            <option value="">
                                                {`Select ${key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}`}
                                            </option>
                                            {key === "claimType" && ["Farm Vehicle Replacement", "Irrigation System Maintenance", "Farm Liability Insurance", "Agricultural Building Repair"].map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                            {key === "farmerType" && ["Small", "Semi-Medium", "Medium", "Large"].map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                            {key === "state" && ["Bihar", "Odisha", "Mizoram", "Andhra Pradesh", "Kerala", "Manipur", "Punjab"].map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                            {key === "causeOfLoss" && ["Drought", "Flood", "Frost", "Hailstorm", "Windstorm", "Excessive Heat", "Excessive Rainfall"].map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            name={key}
                                            required
                                            value={formData[key]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-5 py-3 rounded-xl border ${touchedFields[key] && errors[key] ? 'border-red-400 shadow-red-100' : 'border-emerald-200'} bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-300`}
                                            placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                                        />
                                    )}
                                    {touchedFields[key] && errors[key] && (
                                        <p className="absolute -bottom-6 left-2 text-sm text-red-500 animate-bounceIn font-medium">
                                            {errors[key]}
                                        </p>
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
                        <span className="relative z-10">Submit Claim</span>
                        <span className="absolute inset-0 bg-green-800 opacity-0 group-hover:opacity-30 animate-scaleIn transition-opacity duration-300"></span>
                        <span className="absolute top-0 left-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500"></span>
                    </button>
                </div>
            </form>

            {/* Success Message */}
            {showSuccess && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl animate-bounceIn flex items-center z-50">
                    <svg className="w-7 h-7 mr-3 animate-spinSlow" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg font-semibold">Claim Submitted Successfully!</span>
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

export default Complain;