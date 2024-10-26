import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ userAadhar }) { // Accept userAadhar as a prop from the Login component or authentication context
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  // Fetch user data when the component mounts
  useEffect(() => {
    if (userAadhar) {
      axios.get(`http://localhost:5000/user/${userAadhar}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(err => {
          setError(err.response?.data?.message || 'Error fetching user data');
        });
    }
  }, [userAadhar]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {userData ? (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Welcome, {userData.fullName}</h2>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Aadhar:</strong> {userData.aadhar}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Address:</strong> {userData.address}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;
