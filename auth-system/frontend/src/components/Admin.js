import React, { useEffect, useState } from "react";
import { Search, Filter, CheckCircle, XCircle, Clock, RefreshCw, AlertTriangle } from 'lucide-react';
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

const Admin = ({ onAdminLogout }) => {
    const [formData, setFormData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [statusMap, setStatusMap] = useState({});
    const [suggestedStatus, setSuggestedStatus] = useState({});
    const [decisionMessage, setDecisionMessage] = useState("");
    const [idealValues, setIdealValues] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        onAdminLogout();
        navigate('/adminlogin'); // Redirect to login page
    };

    const languages = [
        { key: "en",  states: ["All India (Urban & Official)"] },
        { key: "hi",  states: ["Uttar Pradesh", "Bihar", "Madhya Pradesh", "Rajasthan", "Haryana", "Himachal Pradesh", "Chhattisgarh", "Jharkhand", "Uttarakhand", "Delhi"] },
        { key: "as",  states: ["Assam"] },
        { key: "bn",  states: ["West Bengal", "Tripura", "Assam"] },
        { key: "gu",  states: ["Gujarat", "Dadra and Nagar Haveli and Daman and Diu"] },
        { key: "kn",  states: ["Karnataka"] },
        { key: "ml",  states: ["Kerala", "Lakshadweep"] },
        { key: "mr",  states: ["Maharashtra", "Goa"] },
        { key: "or",  states: ["Odisha"] },
        { key: "pa",  states: ["Punjab", "Haryana (some regions)", "Delhi (some regions)"] },
        { key: "ta",  states: ["Tamil Nadu", "Puducherry"] },
        { key: "te",  states: ["Andhra Pradesh", "Telangana", "Puducherry (Yanam)"] }
    ];

    // Fetch complaints from API
    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_AVK_ENDPOINT}/api/complaints`)
            .then((response) => response.json())
            .then((data) => {
            const initialStatusMap = data.reduce((acc, item) => {
                acc[item._id] = item.status || "Pending";
                return acc;
            }, {});
            setStatusMap(initialStatusMap);
            setFormData(data);
            setFilteredData(data);
            setIsLoading(false);
            })
            .catch((error) => {
            console.error("Error fetching data :", error);
            setIsLoading(false);
            });
    }, []);

    // Handle search and filtering
    useEffect(() => {
        let result = formData;

        if (searchTerm) {
            result = result.filter(item =>
                (item.aadhaar && item.aadhaar.includes(searchTerm))

            );
        }

        if (statusFilter !== 'all') {
            result = result.filter(item => (statusMap[item._id] || "Pending").toLowerCase() === statusFilter.toLowerCase());
        }

        setFilteredData(result);
    }, [searchTerm, statusFilter, formData, statusMap]);

    // Calculate statistics
    const stats = {
        total: formData.length,
        pending: Object.values(statusMap).filter(status => status === "Pending").length,
        approved: Object.values(statusMap).filter(status => status === "Approved").length,
        rejected: Object.values(statusMap).filter(status => status === "Rejected").length,
        inReview: Object.values(statusMap).filter(status => status === "In Review").length
    };

    const calculateAverage = (arr) => arr.reduce((sum, value) => sum + value, 0) / arr.length;

    useEffect(() => {
        if (selectedItem) {
            setWeatherData(null);
            setDecisionMessage("Fetching weather data...");
            fetchCoordinates(selectedItem.pincode, selectedItem);
        }
    }, [selectedItem]);

    const fetchWeatherData = async (lat, lon, dateOfSowing, item) => {
        const startDate = new Date(dateOfSowing);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 4);

        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = endDate.toISOString().split("T")[0];

        try {
            const response = await fetch(
                `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${formattedStartDate}&end_date=${formattedEndDate}&hourly=temperature_2m,snow_depth,relative_humidity_2m,rain,wind_speed_10m,soil_temperature_0_to_7cm`
            );
            const data = await response.json();

            if (data.hourly) {
                const averages = {
                    Temperature: calculateAverage(data.hourly.temperature_2m).toFixed(2) + "°C",
                    Humidity: calculateAverage(data.hourly.relative_humidity_2m).toFixed(2) + "%",
                    Rainfall: calculateAverage(data.hourly.rain).toFixed(2) + "mm",
                    WindSpeed: calculateAverage(data.hourly.wind_speed_10m).toFixed(2) + " km/h",
                    SoilTemp: calculateAverage(data.hourly.soil_temperature_0_to_7cm).toFixed(2) + "°C",
                };

                let suggested = "Rejected";
                let message = "The weather conditions do not match the reported loss. Suggesting rejection.";
                let idealConditions = {};

                if (item.causeOfLoss === "Drought" || item.causeOfLoss === "Excessive Heat") {
                    idealConditions = {
                        Temperature: "> 20°C",
                        Humidity: "> 80%",
                        Rainfall: "< 10mm",
                        WindSpeed: "<30 km/h",
                        SoilTemp: "> 25°C",
                    };
                    if (
                        parseFloat(averages.Temperature) > 20 &&
                        parseFloat(averages.Humidity) > 80 &&
                        parseFloat(averages.Rainfall) < 10 &&
                        parseFloat(averages.SoilTemp) > 25
                    ) {
                        suggested = "Approved";
                        message = "Weather data matches reported loss. Suggesting approval.";
                    }
                } else if (item.causeOfLoss === "Flood") {
                    idealConditions = {
                        Temperature: "< 20°C",
                        Humidity: "> 80%",
                        Rainfall: "> 250mm",
                        WindSpeed: "> 15 km/h",
                        SoilTemp: "< 20°C",
                    };
                    if (
                        parseFloat(averages.Humidity) > 80 &&
                        parseFloat(averages.Rainfall) > 250 &&
                        parseFloat(averages.WindSpeed) > 15 &&
                        parseFloat(averages.SoilTemp) < 20
                    ) {
                        suggested = "Approved";
                        message = "Weather data matches reported loss. Suggesting approval.";
                    }
                } else if (item.causeOfLoss === "Frost" || item.causeOfLoss === "Hailstorm") {
                    idealConditions = {
                        Temperature: "< 28°C",
                        Rainfall: "< 5mm",
                        SoilTemp: "< 30°C",
                    };
                    if (
                        parseFloat(averages.Temperature) < 28 &&
                        parseFloat(averages.Rainfall) < 5 &&
                        parseFloat(averages.SoilTemp) < 30
                    ) {
                        suggested = "Approved";
                        message = "Weather data matches reported loss. Suggesting approval.";
                    }
                }

                setSuggestedStatus((prev) => ({ ...prev, [item._id]: suggested }));
                setWeatherData(averages);
                setIdealValues(idealConditions);
                setDecisionMessage(message);

            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setDecisionMessage("Error fetching weather data.");
        }
    };

    const updateComplaintStatus = async (id, newStatus) => {
        try {
            // Step 1: Fetch complaint details
            const complaintResponse = await fetch(`${process.env.REACT_APP_AVK_ENDPOINT}/api/complain/status?id=${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
    
            if (!complaintResponse.ok) throw new Error("Failed to fetch complaint details");
    
            const complaintData = await complaintResponse.json();
            let phoneNumber = complaintData.phone;
            const userName = complaintData.name;
            const userState = complaintData.state;
    
            if (!phoneNumber || !userName || !userState) throw new Error("Missing complaint details");
    
            // Step 2: Ensure phone number has +91 prefix
            if (!phoneNumber.startsWith("+91")) phoneNumber = `+91${phoneNumber}`;
    
            // Step 3: Determine language based on state
            const userLanguage = languages.find(lang => lang.states.includes(userState))?.key || "en";
    
            // Step 4: Update complaint status
            const response = await fetch(`${process.env.REACT_APP_AVK_ENDPOINT}/api/complaints/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error("Failed to update status");
    
            setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
    
            // Refresh complaints data
            fetch(`${process.env.REACT_APP_AVK_ENDPOINT}/api/complaints`)
                .then((res) => res.json())
                .then((data) => {
                    const updatedStatusMap = data.reduce((acc, item) => {
                        acc[item._id] = item.status || "Pending";
                        return acc;
                    }, {});
                    setStatusMap(updatedStatusMap);
                    setFormData(data);
                })
                .catch((error) => console.error("Error refreshing data:", error));
    
            // Step 5: Prepare SMS message
            const messageEn = newStatus === "Approved"
                ? `Dear ${userName}, your claim (ID: ${id}) has been approved. Weather data matches the reported loss.`
                : `Dear ${userName}, your claim (ID: ${id}) has been rejected. The weather conditions do not match the reported loss.`;
    
            // Step 6: Translate SMS if not English
            let translatedMessage = messageEn;
            if (userLanguage !== "en") {
                const translationResponse = await fetch("https://revapi.reverieinc.com/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "REV-API-KEY": "<YOUR API KEY>",
                        "REV-APP-ID": "<YOUR APP-ID>",
                        "src_lang": "en",
                        "tgt_lang": userLanguage,
                        "domain": "generic",
                        "REV-APPNAME": "localization",
                        "REV-APPVERSION": "3.0"
                    },
                    body: JSON.stringify({
                        data: [messageEn],
                        nmtMask: true,
                        enableNmt: true,
                        enableLookup: true
                    }),
                });
    
                const translationData = await translationResponse.json();
                if (translationData?.responseList?.length > 0) {
                    translatedMessage = translationData.responseList[0].outString;
                }
            }
    
            // Step 7: Send SMS
            await fetch(`${process.env.REACT_APP_AVK_ENDPOINT}/send-sms`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: phoneNumber,
                    message: translatedMessage,
                }),
            });
    
            console.log(`Complaint ${newStatus}, SMS sent to ${phoneNumber} in ${userLanguage}`);
        } catch (error) {
            console.error("Error updating complaint status or sending SMS:", error);
        }
    };
    
    
    
    

    const fetchCoordinates = async (pincode, item) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=IN&format=json`);
            const data = await response.json();
            if (data.length > 0) {
                fetchWeatherData(data[0].lat, data[0].lon, item.dateOfSowing, item);
            } else {
                setDecisionMessage("Location not found for the given pincode.");
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            setDecisionMessage("Error fetching location data.");
        }
    };

    const handleStatusClick = async (item) => { 
        try {
            // Fetch the current status from the API
            const response = await fetch(`${process.env.REACT_APP_AVK_ENDPOINT}/api/complain/status?id=${item._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch complaint status');
            }    
            const data = await response.json();
            
            const currentStatus = data.status;
            if (currentStatus !== "Rejected" && currentStatus !== "Approved") {
                await updateComplaintStatus(item._id, "In Review");
            } else {
            }
    
            setSelectedItem(null);
            setTimeout(() => {
                setSelectedItem(item);
            }, 50);
    
        } catch (error) {
            console.error("Error in handleStatusClick:", error);
        }
    };

    const closePopup = () => {
        setSelectedItem(null);
        setWeatherData(null);
        setDecisionMessage("");
    };

    const getStatusStyle = (status) => {
        status = status || "Pending";
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-800";
            case "Rejected":
                return "bg-red-100 text-red-800";
            case "In Review":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-yellow-100 text-yellow-800";
        }
    };

    return (
        <>
            <div className="p-6 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Crop Loss Claims Dashboard
                        </h1>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                            Logout
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">Total Claims</p>
                                    <p className="text-2xl font-bold">{stats.total}</p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <RefreshCw size={20} className="text-blue-500" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">Pending</p>
                                    <p className="text-2xl font-bold">{stats.pending}</p>
                                </div>
                                <div className="bg-yellow-100 p-2 rounded-full">
                                    <Clock size={20} className="text-yellow-500" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">Approved</p>
                                    <p className="text-2xl font-bold">{stats.approved}</p>
                                </div>
                                <div className="bg-green-100 p-2 rounded-full">
                                    <CheckCircle size={20} className="text-green-500" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">Rejected</p>
                                    <p className="text-2xl font-bold">{stats.rejected}</p>
                                </div>
                                <div className="bg-red-100 p-2 rounded-full">
                                    <XCircle size={20} className="text-red-500" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">In Review</p>
                                    <p className="text-2xl font-bold">{stats.inReview}</p>
                                </div>
                                <div className="bg-purple-100 p-2 rounded-full">
                                    <AlertTriangle size={20} className="text-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search by Aadhaar"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center">
                                <label className="mr-2 text-gray-600 whitespace-nowrap">Filter by Status:</label>
                                <div className="relative">
                                    <select
                                        className="block appearance-none bg-white border border-gray-300 p-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="all">All Claims</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="in review">In Review</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <Filter size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {isLoading ? (
                            <div className="p-6 text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading claims data...</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-3 text-left font-semibold text-gray-600 border-b">AADHAR NO</th>
                                            <th className="p-3 text-left font-semibold text-gray-600 border-b">Name</th>
                                            <th className="p-3 text-left font-semibold text-gray-600 border-b">District</th>
                                            <th className="p-3 text-left font-semibold text-gray-600 border-b">Pincode</th>
                                            <th className="p-3 text-left font-semibold text-gray-600 border-b">Reason</th>
                                            <th className="p-3 text-left font-semibold text-gray-600 border-b">Date of Sowing</th>
                                            <th className="p-3 text-left font-semibold text-gray-600 border-b">Area Impacted</th>
                                            <th className="p-3 text-left font-semibold text-gray-600 border-b">Mobile</th>
                                            <th className="p-3 text-left font-semibold text-gray-600 border-b">Status</th>
                                            <th className="p-3 text-left font-semibold text-gray-600 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length > 0 ? (
                                            filteredData.map((item, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                                    onMouseEnter={(e) => e.currentTarget.classList.add('bg-blue-50')}
                                                    onMouseLeave={(e) => e.currentTarget.classList.remove('bg-blue-50')}>
                                                    <td className="p-3 border-b">{item.aadhaar}</td>
                                                    <td className="p-3 border-b font-medium">{item.name}</td>
                                                    <td className="p-3 border-b">{item.district}</td>
                                                    <td className="p-3 border-b">{item.pincode}</td>
                                                    <td className="p-3 border-b">{item.causeOfLoss}</td>
                                                    <td className="p-3 border-b">{item.dateOfSowing}</td>
                                                    <td className="p-3 border-b">{item.areaImpacted} acres</td>
                                                    <td className="p-3 border-b">{item.phone}</td>
                                                    <td className="p-3 border-b">
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(statusMap[item._id])}`}>
                                                            {statusMap[item._id] || "Pending"}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 border-b">
                                                        <button
                                                            onClick={() => handleStatusClick(item)}
                                                            className="text-blue-600 hover:text-blue-800 mr-2 font-medium"
                                                        >
                                                            View Analysis
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="p-4 text-center text-gray-500">
                                                    No records found matching your search criteria
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {filteredData.length > 0 && (
                            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Previous
                                    </button>
                                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Next
                                    </button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredData.length}</span> of{' '}
                                            <span className="font-medium">{filteredData.length}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Previous</span>
                                                «
                                            </button>
                                            <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                                1
                                            </button>
                                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Next</span>
                                                »
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {selectedItem && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-gray-800">Claim Analysis</h3>
                                    <button onClick={closePopup} className="text-gray-400 hover:text-gray-600">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h4 className="text-lg font-semibold mb-2 text-gray-700">Farmer Details</h4>
                                        <div className="bg-gray-50 p-4 rounded">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="text-sm text-gray-500">Name:</div>
                                                <div className="text-sm font-medium">{selectedItem.name}</div>
                                                <div className="text-sm text-gray-500">Aadhaar:</div>
                                                <div className="text-sm font-medium">{selectedItem.aadhaar}</div>
                                                <div className="text-sm text-gray-500">District:</div>
                                                <div className="text-sm font-medium">{selectedItem.district}</div>
                                                <div className="text-sm text-gray-500">Phone:</div>
                                                <div className="text-sm font-medium">{selectedItem.phone}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold mb-2 text-gray-700">Claim Details</h4>
                                        <div className="bg-gray-50 p-4 rounded">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="text-sm text-gray-500">Cause of Loss:</div>
                                                <div className="text-sm font-medium">{selectedItem.causeOfLoss}</div>
                                                <div className="text-sm text-gray-500">Date of Sowing:</div>
                                                <div className="text-sm font-medium">{selectedItem.dateOfSowing}</div>
                                                <div className="text-sm text-gray-500">Area Impacted:</div>
                                                <div className="text-sm font-medium">{selectedItem.areaImpacted} acres</div>
                                                <div className="text-sm text-gray-500">Current Status:</div>
                                                <div className="text-sm font-medium">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(statusMap[selectedItem._id])}`}>
                                                        {statusMap[selectedItem._id] || "Pending"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="text-lg font-semibold mb-2 text-gray-700">Weather Analysis</h4>
                                {weatherData ? (
                                    <>
                                        <div className="bg-gray-50 p-4 rounded mb-6">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="p-2 text-left border">Parameter</th>
                                                        <th className="p-2 text-left border">Ideal Conditions</th>
                                                        <th className="p-2 text-left border">Actual Conditions</th>
                                                        <th className="p-2 text-left border">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(idealValues).map((key) => {
                                                        const idealValue = idealValues[key];
                                                        const actualValue = weatherData[key];
                                                        let isWithinRange = false;

                                                        if (idealValue && actualValue) {
                                                            if (idealValue.includes(">")) {
                                                                const threshold = parseFloat(idealValue.replace(/[^0-9.-]+/g, ""));
                                                                isWithinRange = parseFloat(actualValue) > threshold;
                                                            } else if (idealValue.includes("<")) {
                                                                const threshold = parseFloat(idealValue.replace(/[^0-9.-]+/g, ""));
                                                                isWithinRange = parseFloat(actualValue) < threshold;
                                                            }
                                                        }

                                                        return (
                                                            <tr key={key}>
                                                                <td className="p-2 border">{key}</td>
                                                                <td className="p-2 border">{idealValues[key] || "N/A"}</td>
                                                                <td className="p-2 border">{weatherData[key] || "N/A"}</td>
                                                                <td className="p-2 border">
                                                                    <span className={`inline-block h-3 w-3 rounded-full ${isWithinRange ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className={`border-l-4 p-4 mb-6 ${suggestedStatus[selectedItem._id] === "Approved" ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"}`}>
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    {suggestedStatus[selectedItem._id] === "Approved" ? (
                                                        <CheckCircle size={20} className="text-green-500" />
                                                    ) : (
                                                        <XCircle size={20} className="text-red-500" />
                                                    )}
                                                </div>
                                                <div className="ml-3">
                                                    <p className={`text-sm ${suggestedStatus[selectedItem._id] === "Approved" ? "text-green-700" : "text-red-700"}`}>
                                                        {decisionMessage}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-gray-50 p-8 rounded mb-6 flex flex-col items-center justify-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
                                        <p className="text-gray-600 text-center">Loading weather data...</p>
                                    </div>
                                )}

                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => {
                                            updateComplaintStatus(selectedItem._id, "Rejected");
                                            closePopup();
                                        }}
                                        //disabled={statusMap[selectedItem._id] === "Approved" || statusMap[selectedItem._id] === "Rejected" || !weatherData}
                                        className={`px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${!weatherData
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        Reject Claim
                                    </button>
                                    <button
                                        onClick={() => {
                                            updateComplaintStatus(selectedItem._id, "Approved");
                                            closePopup();
                                        }}
                                        //disabled={statusMap[selectedItem._id] === "Approved" || statusMap[selectedItem._id] === "Rejected" || !weatherData}
                                        className={`px-4 py-2 bg-green-600 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${!weatherData
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-green-700"
                                            }`}
                                    >
                                        Approve Claim
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Admin;