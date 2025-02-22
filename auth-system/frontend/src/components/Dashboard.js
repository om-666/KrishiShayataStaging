import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, MapPin, CreditCard, LogOut } from 'lucide-react';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const aadhar = localStorage.getItem('userAadhar');
      if (!aadhar) {
        navigate('/login');
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

  const handleLogout = () => {
    localStorage.removeItem('userAadhar');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 overflow-hidden">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-emerald-800/50 to-teal-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 animate-slideDown">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 p-1 animate-scaleIn">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
                  <span className="text-4xl font-bold text-emerald-400 group-hover:text-emerald-300">
                    {user?.fullName?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-400 rounded-full border-4 border-gray-900 animate-pulse"></div>
            </div>
            <div className="text-center md:text-left animate-fadeInUp">
              <h1 className="text-4xl font-bold text-white mb-2">{user?.fullName || 'User'}</h1>
              <p className="text-emerald-300 text-lg">Welcome to your personalized dashboard</p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-800/50 to-teal-800/50 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 group transition-all duration-300 hover:shadow-emerald-900/30 animate-slideUp">
            <div className="border-b border-emerald-500/20 pb-4 mb-4 group-hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-emerald-400 animate-bounceIn" />
                <h2 className="text-2xl font-semibold text-white">Personal Information</h2>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-emerald-900/30 rounded-lg hover:bg-emerald-900/50 transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <Phone className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-emerald-300/80">Phone Number</p>
                  <p className="font-medium text-white text-lg">{user?.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-emerald-900/30 rounded-lg hover:bg-emerald-900/50 transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '300ms' }}>
                <CreditCard className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-emerald-300/80">Aadhar Number</p>
                  <p className="font-medium text-white text-lg">
                    {user?.aadhar?.replace(/\d{4}(?=\d)/g, '$& ') || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-800/50 to-teal-800/50 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 group transition-all duration-300 hover:shadow-emerald-900/30 animate-slideUp" style={{ animationDelay: '100ms' }}>
            <div className="border-b border-emerald-500/20 pb-4 mb-4 group-hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-emerald-400 animate-bounceIn" />
                <h2 className="text-2xl font-semibold text-white">Contact Details</h2>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-emerald-900/30 rounded-lg hover:bg-emerald-900/50 transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '400ms' }}>
                <Mail className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-emerald-300/80">Email Address</p>
                  <p className="font-medium text-white text-lg">{user?.email || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-emerald-900/30 rounded-lg hover:bg-emerald-900/50 transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '500ms' }}>
                <MapPin className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-emerald-300/80">Address</p>
                  <p className="font-medium text-white text-lg">{user?.address || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}

export default Dashboard;