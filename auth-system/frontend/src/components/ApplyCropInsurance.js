import React, { useState } from "react";
import { message, DatePicker, Select } from 'antd';

const { Option } = Select;

const ApplyInsuranceForm = () => {
    const [formData, setFormData] = useState({
        aadhar: "",
        name: "",
        district: "",
        pincode: "",
        account: "",
        branch: "",
        ifsc: "",
        mobile: "",
        crop: "",
        dateOfSowing: "",
        areaSown: "",
        season: ""
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [touchedFields, setTouchedFields] = useState({});

    const formSections = {
        "Personal Details": ["aadhar", "name", "district", "pincode"],
        "Bank Details": ["account", "branch", "ifsc"],
        "Crop Details": ["crop", "dateOfSowing", "areaSown", "season"],
        "Contact Details": ["mobile"]
    };

    const validationRules = {
        aadhar: (value) => {
            if (!value) return "Aadhar number is required";
            if (value.length !== 12) return "Aadhar number must be 12 digits";
            if (!/^\d+$/.test(value)) return "Aadhar number must contain only digits";
            return "";
        },
        district: (value) => value ? "" : "District is required",
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
        }
    };

    const validateField = (name, value) => {
        const validationRule = validationRules[name];
        return validationRule ? validationRule(value) : "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "mobile") {
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
        else if (name === "areaSown") {
            if (!/^\d*$/.test(value)) {
                messageApi.warning('Area Sown must contain only digits');
                return;
            }
        }
        else if (name === "account") {
            if (value.length > 18) {
                messageApi.warning('Account number cannot exceed 18 digits');
                return;
            }
            if (!/^\d*$/.test(value)) {
                messageApi.warning('Account number must contain only digits');
                return;
            }
        }
        else if (name === "aadhar") {
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

        // if (["aadhar", "mobile", "pincode", "account"].includes(name)) {
        //     if (!/^\d*$/.test(value)) {
        //         messageApi.warning(`${name.charAt(0).toUpperCase() + name.slice(1)} should contain only numbers`);
        //         return;
        //     }
        // }

        // setFormData(prev => ({ ...prev, [name]: newValue }));

        // if (errors[name]) {
        //     setErrors(prev => ({ ...prev, [name]: "" }));
        // }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleDateChange = (date, dateString) => {
        setFormData(prev => ({ ...prev, dateOfSowing: dateString }));
    };

    const handleSeasonChange = (value) => {
        setFormData(prev => ({ ...prev, season: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            messageApi.error('Please fix all errors before submitting');
            return;
        }
        setShowSuccess(true);
        messageApi.success('Form submitted successfully!');
        setFormData({
            aadhar: "",
            name: "",
            district: "",
            pincode: "",
            account: "",
            branch: "",
            ifsc: "",
            mobile: "",
            crop: "",
            dateOfSowing: "",
            areaSown: "",
            season: ""
        });

        setErrors({});
        setTouchedFields({});
        setTimeout(() => setShowSuccess(false), 3000);
        console.log(formData);
    };

    return (
        <div className="min-h-screen py-8 px-4">
            {contextHolder}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 p-8">
                        <h2 className="text-3xl font-bold text-center mb-2 text-white">Apply for Crop Insurance</h2>
                        <p className="text-center text-green-100 text-sm">
                            Please fill in the details below to submit your claim
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8">
                        {Object.entries(formSections).map(([section, fields]) => (
                            <div key={section} className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-green-100">{section}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {fields.map((key) => (
                                        <div key={key}>
                                            <label className="block text-sm font-medium text-gray-600">
                                                {key === "areaSown" ? "Area Sown (in acres)" : key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                                            </label>
                                            {key === "dateOfSowing" ? (
                                                <DatePicker onChange={handleDateChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500" />
                                            ) : key === "season" ? (
                                                <select
                                                    value={formData.season}
                                                    onChange={(e) => handleSeasonChange(e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500"
                                                >
                                                    <option value="" disabled>Select a season</option>
                                                    <option value="Rabi">Rabi</option>
                                                    <option value="Kharif">Kharif</option>
                                                </select>

                                            ) : (
                                                <input
                                                    type="text"
                                                    name={key}
                                                    required
                                                    value={formData[key]}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`w-full px-4 py-2.5 rounded-xl border ${errors[key] ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-green-500`}
                                                    placeholder={key === "areaSown" ? "Enter area sown (in acres)" : `Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                                                />
                                            )}
                                            {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center mt-8">
                            <button type="submit" className="px-8 py-3 bg-green-600 text-white rounded-xl shadow-lg">Submit</button>
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

export default ApplyInsuranceForm;