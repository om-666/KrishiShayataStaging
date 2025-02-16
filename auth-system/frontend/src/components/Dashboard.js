import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const aadhar = localStorage.getItem('userAadhar');
      if (!aadhar) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${aadhar}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {user?.fullName}</h2>
      <p className="text-gray-600"><strong className="text-gray-800">Phone:</strong> {user?.phone}</p>
      <p className="text-gray-600"><strong className="text-gray-800">Aadhar:</strong> {user?.aadhar}</p>
      <p className="text-gray-600"><strong className="text-gray-800">Address:</strong> {user?.address}</p>
      <p className="text-gray-600"><strong className="text-gray-800">Email:</strong> {user?.email}</p>
      
      <button 
        className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
        onClick={() => {
          localStorage.removeItem('userAadhar');
          navigate('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
