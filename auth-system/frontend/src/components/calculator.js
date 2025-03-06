import { Calculator, Calendar, Sprout, Map, FileText, RotateCcw, AlertTriangle } from 'lucide-react';
import React, { useState } from 'react';

const Calculators = () => {
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [crop, setCrop] = useState('');
    const [area, setArea] = useState('');
    const [premiumDetails, setPremiumDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Define insurance parameters for different crops
    const insuranceParams = [
        {
            crop: "Jute",
            season: "Kharif",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "20-09-2023",
        },
        {
            crop: "Oil Seeds",
            season: "Rabi",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "25-09-2023",
        },
        {
            crop: "Pulses",
            season: "Kharif",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "20-09-2023",
        },
        {
            crop: "Coconut",
            season: "Annual",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "01-10-2023",
        },
        {
            crop: "Mesta",
            season: "Kharif",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "20-09-2023",
        },
        {
            crop: "Sugarcane",
            season: "Kharif",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "20-09-2023",
        },
        {
            crop: "Rubber",
            season: "Annual",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "01-10-2023",
        },
        {
            crop: "Cotton",
            season: "Kharif",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "20-09-2023",
        },
        {
            crop: "Gram",
            season: "Rabi",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "25-09-2023",
        },
        {
            crop: "Mustard",
            season: "Rabi",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "25-09-2023",
        },
        {
            crop: "Maize",
            season: "Kharif",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "20-09-2023",
        },
        {
            crop: "Sesame",
            season: "Kharif",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "20-09-2023",
        },
        {
            crop: "Ragi",
            season: "Kharif",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "20-09-2023",
        },
        {
            crop: "Potato",
            season: "Rabi",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "25-09-2023",
        },
        {
            crop: "Soybean",
            season: "Kharif",
            sumInsuredPerHectare: 320000,
            actuarialRate: 15,
            cutOffDate: "20-09-2023",
        }
    ];

    // Define constants for farmerSharePercentage based on season
    const farmerSharePercentage = {
        Kharif: 2,
        Rabi: 1.5,
        Annual: 5
    };

    // Define districts for all Indian states and union territories
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
        "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"]
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setState(selectedState);
        setDistrict('');
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const validateInputs = () => {
        if (!state) {
            setError('Please select a state');
            return false;
        }

        if (!district) {
            setError('Please select a district');
            return false;
        }

        if (!crop) {
            setError('Please select a crop');
            return false;
        }

        const areaValue = parseFloat(area);
        if (isNaN(areaValue) || areaValue <= 0) {
            setError('Please enter a valid area value greater than 0');
            return false;
        }

        setError('');
        return true;
    };

    const calculatePremium = () => {
        if (!validateInputs()) {
            return;
        }

        setLoading(true);

        // Simulate API call with setTimeout
        setTimeout(() => {
            const areaValue = parseFloat(area);
            const season = insuranceParams.find(param => param.crop === crop)?.season;
            const selectedCropParams = insuranceParams.find(
                (param) => param.crop === crop && param.season === season
            );

            if (selectedCropParams) {
                const {
                    sumInsuredPerHectare,
                    actuarialRate,
                    cutOffDate,
                } = selectedCropParams;

                const farmerShare = farmerSharePercentage[season];
                const premiumPaidByFarmer = sumInsuredPerHectare * areaValue * (farmerShare / 100);
                const premiumPaidByGovt = sumInsuredPerHectare * areaValue * ((actuarialRate - farmerShare) / 100);
                const totalSumInsured = sumInsuredPerHectare * areaValue;

                setPremiumDetails({
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
                    totalSumInsured
                });
            } else {
                setError("Crop parameters not found. Please select a valid crop.");
            }

            setLoading(false);
        }, 800);
    };

    const resetForm = () => {
        setState('');
        setDistrict('');
        setCrop('');
        setArea('');
        setPremiumDetails(null);
        setError('');
    };

    const getSeasonColor = (season) => {
        switch (season) {
            case 'Kharif': return 'bg-green-100 text-green-800';
            case 'Rabi': return 'bg-amber-100 text-amber-800';
            case 'Annual': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 py-6 px-6">
                    <div className="flex items-center justify-center gap-3">
                        <Calculator className="text-white" size={28} />
                        <h1 className="text-center text-white font-bold text-2xl">Crop Insurance Premium Calculator</h1>
                    </div>
                    <p className="text-center text-emerald-100 mt-2">Estimate your premium costs and coverage details</p>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                            <AlertTriangle size={20} />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <label htmlFor="state" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <Map size={16} />
                                State
                            </label>
                            <select
                                id="state"
                                value={state}
                                onChange={handleStateChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            >
                                <option value="">Select State</option>
                                {Object.keys(districtOptions).sort().map((stateName) => (
                                    <option key={stateName} value={stateName}>{stateName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="district" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <Map size={16} />
                                District
                            </label>
                            <select
                                id="district"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${!state ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                                disabled={!state}
                            >
                                <option value="">Select District</option>
                                {state && districtOptions[state]?.map((districtName) => (
                                    <option key={districtName} value={districtName}>{districtName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="crop" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <Sprout size={16} />
                                Crop
                            </label>
                            <select
                                id="crop"
                                value={crop}
                                onChange={(e) => setCrop(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            >
                                <option value="">Select Crop</option>
                                {insuranceParams.sort((a, b) => a.crop.localeCompare(b.crop)).map((param) => (
                                    <option key={param.crop} value={param.crop}>{param.crop} ({param.season})</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="area" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FileText size={16} />
                                Area (hectares)
                            </label>
                            <input
                                type="number"
                                id="area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                min="0.1"
                                step="0.1"
                                placeholder="Enter land area"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={calculatePremium}
                            disabled={loading}
                            className={`flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                    <span>Calculating...</span>
                                </>
                            ) : (
                                <>
                                    <Calculator size={18} />
                                    <span>Calculate Premium</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={resetForm}
                            disabled={loading}
                            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-8 rounded-lg transition duration-300"
                        >
                            <RotateCcw size={18} />
                            <span>Reset</span>
                        </button>
                    </div>
                </div>

                {premiumDetails && (
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <h2 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                            <FileText size={20} />
                            Premium Calculation Results
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                                <h3 className="text-lg font-medium text-gray-700 mb-4">Policy Details</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Insurance Company</span>
                                        <span className="font-medium">{premiumDetails.insuranceCompany}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Crop</span>
                                        <span className="font-medium">{premiumDetails.crop}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Season</span>
                                        <span className={`${getSeasonColor(premiumDetails.season)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                                            {premiumDetails.season}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Cut-off Date</span>
                                        <span className="font-medium flex items-center gap-1">
                                            <Calendar size={14} />
                                            {premiumDetails.cutOffDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Area (Hectares)</span>
                                        <span className="font-medium">{premiumDetails.area}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                                <h3 className="text-lg font-medium text-gray-700 mb-4">Coverage Details</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Sum Insured Per Hectare</span>
                                        <span className="font-medium">{formatCurrency(premiumDetails.sumInsuredPerHectare)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Total Sum Insured</span>
                                        <span className="font-medium">{formatCurrency(premiumDetails.totalSumInsured)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Actuarial Rate</span>
                                        <span className="font-medium">{premiumDetails.actuarialRate}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Farmer Share</span>
                                        <span className="font-medium">{premiumDetails.farmerShare}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Premium Breakdown</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-emerald-50 p-4 rounded-lg">
                                    <p className="text-sm text-emerald-600 mb-1">Farmer Premium</p>
                                    <p className="text-2xl font-bold text-emerald-800">{formatCurrency(premiumDetails.premiumPaidByFarmer)}</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-blue-600 mb-1">Government Subsidy</p>
                                    <p className="text-2xl font-bold text-blue-800">{formatCurrency(premiumDetails.premiumPaidByGovt)}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Total Premium</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {formatCurrency(premiumDetails.premiumPaidByFarmer + premiumDetails.premiumPaidByGovt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calculators;