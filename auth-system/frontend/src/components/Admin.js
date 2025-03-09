import React, { useEffect, useState } from "react";

const Admin = () => {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/formdatas")
            .then((response) => response.json())
            .then((data) => setFormData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Admin Panel - Form Data</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Aadhar</th>
                            <th className="border p-2">District</th>
                            <th className="border p-2">Pincode</th>
                            <th className="border p-2">Account</th>
                            <th className="border p-2">Branch</th>
                            <th className="border p-2">IFSC</th>
                            <th className="border p-2">Mobile</th>
                            <th className="border p-2">Crop</th>
                            <th className="border p-2">Date of Sowing</th>
                            <th className="border p-2">Area Sown</th>
                            <th className="border p-2">Season</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((item, index) => (
                            <tr key={index} className="text-center border">
                                <td className="border p-2">{item._id}</td>
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.aadhar}</td>
                                <td className="border p-2">{item.district}</td>
                                <td className="border p-2">{item.pincode}</td>
                                <td className="border p-2">{item.account}</td>
                                <td className="border p-2">{item.branch}</td>
                                <td className="border p-2">{item.ifsc}</td>
                                <td className="border p-2">{item.mobile}</td>
                                <td className="border p-2">{item.crop}</td>
                                <td className="border p-2">{new Date(item.dateOfSowing).toLocaleDateString()}</td>
                                <td className="border p-2">{item.areaSown}</td>
                                <td className="border p-2">{item.season}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
