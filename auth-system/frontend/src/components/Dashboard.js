import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, MapPin, CreditCard } from 'lucide-react';

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
    <div className="min-h-screen mt-5 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#2a3633]/50 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-8 border border-[#ffffff0f] hover:border-[#ffffff1f] transition-all duration-300
                    animate-slideDown opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center p-1 animate-scaleIn opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
                <div className="w-full h-full rounded-full bg-[#2a3633] flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
                  <span className="text-3xl font-bold text-emerald-400 group-hover:text-emerald-300">
                    {user?.fullName?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#2a3633] animate-pulse"></div>
            </div>
            <div className="animate-slideRight opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
              <h1 className="text-2xl font-bold text-white/90">{user?.fullName}</h1>
              <p className="text-emerald-400/80">Welcome to your dashboard</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#2a3633]/50 backdrop-blur-lg rounded-xl shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 border border-[#ffffff0f] hover:border-[#ffffff1f] group
                      animate-slideUp opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
            <div className="p-6 border-b border-[#ffffff0f] group-hover:border-[#ffffff1f] transition-colors">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-400" />
                <h2 className="text-xl font-semibold text-white/90">Personal Information</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-[#ffffff05] rounded-lg hover:bg-[#ffffff08] transition-colors
                          animate-fadeIn opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
                <Phone className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-sm text-emerald-400/80">Phone Number</p>
                  <p className="font-medium text-white/80">{user?.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-[#ffffff05] rounded-lg hover:bg-[#ffffff08] transition-colors
                          animate-fadeIn opacity-0 [animation-delay:900ms] [animation-fill-mode:forwards]">
                <CreditCard className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-sm text-emerald-400/80">Aadhar Number</p>
                  <p className="font-medium text-white/80">
                    {user?.aadhar?.replace(/\d{4}(?=\d)/g, '$& ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#2a3633]/50 backdrop-blur-lg rounded-xl shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 border border-[#ffffff0f] hover:border-[#ffffff1f] group
                      animate-slideUp opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]">
            <div className="p-6 border-b border-[#ffffff0f] group-hover:border-[#ffffff1f] transition-colors">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-emerald-400" />
                <h2 className="text-xl font-semibold text-white/90">Contact Details</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-[#ffffff05] rounded-lg hover:bg-[#ffffff08] transition-colors
                          animate-fadeIn opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]">
                <Mail className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-sm text-emerald-400/80">Email Address</p>
                  <p className="font-medium text-white/80">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-[#ffffff05] rounded-lg hover:bg-[#ffffff08] transition-colors
                          animate-fadeIn opacity-0 [animation-delay:1100ms] [animation-fill-mode:forwards]">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-sm text-emerald-400/80">Address</p>
                  <p className="font-medium text-white/80">{user?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
