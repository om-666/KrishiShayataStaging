import React, { useEffect, useState } from "react";

const Admin = () => {
    const [formData, setFormData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [statusMap, setStatusMap] = useState({});
    const [decisionMessage, setDecisionMessage] = useState("");
    const [idealValues, setIdealValues] = useState({});

    // Fetch complaints from API
    useEffect(() => {
        fetch("http://localhost:5000/api/complaints")
            .then((response) => response.json())
            .then((data) => {
                const initialStatusMap = data.reduce((acc, item) => {
                    acc[item._id] = item.status || "Pending";
                    return acc;
                }, {});
                setStatusMap(initialStatusMap);
                setFormData(data);
            })
            .catch((error) => console.error("Error fetching data :", error));
    }, []);

    // Function to calculate the average of an array
    const calculateAverage = (arr) => arr.reduce((sum, value) => sum + value, 0) / arr.length;

    // Fetch weather data
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

                let status = "Rejected";
                let message = "The weather conditions do not match the reported loss. Claim is rejected.";
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
                        status = "Approved";
                        message = "Weather data matches reported loss. Claim is approved.";
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
                        status = "Approved";
                        message = "Weather data matches reported loss. Claim is approved.";
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
                        status = "Approved";
                        message = "Weather data matches reported loss. Claim is approved.";
                    }
                }

                setStatusMap((prev) => ({ ...prev, [item._id]: status }));
                setWeatherData(averages);
                setIdealValues(idealConditions);
                setDecisionMessage(message);

                updateComplaintStatus(item._id, status);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setDecisionMessage("Error fetching weather data.");
        }
    };

    const updateComplaintStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/complaints/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }), // ✅ Sends status update
            });
    
            const data = await response.json();
            if (response.ok) {
                setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
                Admin(); // ✅ Refresh complaints after update
            } else {
                console.error("Failed to update status:", data.message);
            }
        } catch (error) {
            console.error("Error updating complaint status:", error);
        }
    };    

    const fetchCoordinates = async (pincode, item) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=IN&format=json`);
            const data = await response.json();
            if (data.length > 0) {
                fetchWeatherData(data[0].lat, data[0].lon, item.dateOfSowing, item);
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            setDecisionMessage("Error fetching location data. ");
        }
    };

    const handleStatusClick = (item) => {
        setSelectedItem(null); 
        setTimeout(() => {
            setSelectedItem(item);
        }, 50);
    };

    const closePopup = () => {
        setSelectedItem(null);
        setWeatherData(null);
        setDecisionMessage("");
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Admin Panel - Form Data</h2>

            {/* ✅ Main Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="border p-2">AADHAR NO</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">District</th>
                            <th className="border p-2">Pincode</th>
                            <th className="border p-2">Reason</th>
                            <th className="border p-2">Date of Sowing</th>
                            <th className="border p-2">Area Impacted</th>
                            <th className="border p-2">Mobile</th>                           
                            <th className="border p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((item, index) => (
                        <tr key={index} className="text-center border">
                            <td className="border p-2">{item.aadhaar}</td>
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.district}</td>
                                <td className="border p-2">{item.pincode}</td>
                                <td className="border p-2">{item.causeOfLoss}</td>
                                <td className="border p-2">{item.dateOfSowing}</td>
                                <td className="border p-2">{item.areaImpacted}</td>
                                <td className="border p-2">{item.phone}</td>
                            <td className="border p-2 cursor-pointer text-blue-600 hover:underline" onClick={() => handleStatusClick(item)}>
                                {statusMap[item._id]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ✅ Popup with Comparison Table */}
            {selectedItem && weatherData && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Weather Analysis</h3>
            <table className="w-full border-collapse border">
                <thead>
                    <tr><th>Parameter</th><th>Ideal</th><th>Actual</th></tr>
                </thead>
                <tbody>
                    {weatherData &&
                        Object.keys(idealValues).map((key) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{idealValues[key] || "N/A"}</td>
                                <td>{weatherData[key] || "N/A"}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <p className="mt-4">{decisionMessage}</p>
            <div className="flex justify-center mt-4">
    <button 
        onClick={closePopup} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
        Close
    </button>
</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;