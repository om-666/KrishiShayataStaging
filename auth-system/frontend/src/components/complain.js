import React, { useState } from "react";
import { message } from 'antd';

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
        causeOfLoss: ""
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
        }
    };

    const validateField = (name, value) => {
        const validationRule = validationRules[name];
        return validationRule ? validationRule(value) : "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Input restrictions
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", formData);
            setShowSuccess(true);
            messageApi.success('Form submitted successfully!');
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
                causeOfLoss: ""
            });

            setErrors({});
            setTouchedFields({});
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };


    const formSections = {
        "Personal Details": ["name", "phone", "address", "pincode"],
        "Farm Information": ["farmerType", "areaImpacted", "causeOfLoss"],
        "Claim Details": ["claimType", "amount", "state", "district"],
        "Bank Details": ["bankName", "bankBranch", "accountNumber"]
    };

    return (
        <div className="min-h-screen py-8 px-4">
            {contextHolder}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 relative overflow-hidden">
                        <h2 className="text-3xl font-bold text-center text-white mb-2">Report Crop Loss</h2>
                        <p className="text-center text-green-100 text-sm">
                            Please fill in the details below to submit your claim
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8">
                        {Object.entries(formSections).map(([section, fields]) => (
                            <div key={section} className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-green-100">
                                    {section}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {fields.map((key) => (
                                        <div key={key} className="relative">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                                            </label>
                                            {["claimType", "farmerType", "state", "causeOfLoss"].includes(key) ? (
                                                <select
                                                    name={key}
                                                    required
                                                    value={formData[key]}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`w-full px-4 py-2.5 rounded-xl border ${touchedFields[key] && errors[key] ? 'border-red-500' : 'border-gray-200'} bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none`}
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
                                                    className={`w-full px-4 py-2.5 rounded-xl border ${touchedFields[key] && errors[key] ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none`}
                                                    placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                                                />
                                            )}
                                            {touchedFields[key] && errors[key] && (
                                                <p className="absolute -bottom-5 left-0 text-xs text-red-500">{errors[key]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Submit Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Submit Claim
                            </button>
                        </div>
                    </form>
                </div>
                {showSuccess && (
                    <div className="mt-4 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center justify-center animate-fade-in">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Form submitted successfully!</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Complain;