import React, { useState } from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const AdminLogin = ({ onAdminLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Hardcoded credentials
    const ADMIN_USERNAME = 'krishi_admin';
    const ADMIN_PASSWORD = '123';

    // Color scheme
    const primaryColor = 'rgb(37, 49, 45)';
    const lightGreen = 'rgb(220, 237, 200)';

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            sessionStorage.setItem("isAdminAuthenticated", "true");
            onAdminLogin();
            navigate('/admin');
        } else {
            setError("Invalid username or password");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md border border-gray-200">
                    <div className="flex justify-center mb-6">
                        <div className="text-3xl font-bold" style={{ color: primaryColor }}>
                            Krishi Sahayata
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: primaryColor }}>
                        Admin Login
                    </h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200 flex items-center">
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: primaryColor }}>
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all"
                                style={{ backgroundColor: 'white' }}
                                placeholder="Enter admin username"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: primaryColor }}>
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all"
                                    style={{ backgroundColor: 'white' }}
                                    placeholder="Enter admin password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-md text-white font-medium transition-all hover:bg-opacity-90 mt-6"
                            style={{ backgroundColor: primaryColor }}
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Krishi Sahayata - Farmers' Support Application
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminLogin;