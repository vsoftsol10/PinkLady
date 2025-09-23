import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from "../../assets/AdminBackground.jpg"
import BackgroundVideo from "../../assets/Video.mp4"

const AdminLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dummy credentials
  const DUMMY_CREDENTIALS = {
    email: "admin@example.com",
    password: "admin123"
  };

  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check credentials
    if (data.email === DUMMY_CREDENTIALS.email && data.password === DUMMY_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  // Success screen
  if (isLoggedIn) {
    navigate('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.8) saturate(1.2)' }}
      >
        <source src={BackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${Background})`,
          display: 'none',
        }}
      />

      {/* Enhanced glassy overlay for video */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
        }}
      />
      
      {/* Additional colored overlay */}
      <div 
        className="absolute inset-0 z-20"
        style={{
          background: 'rgba(241, 131, 114, 0.08)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
        }}
      />

      <div 
        className="w-90 max-w-md rounded-2xl shadow-2xl px-8 py-10 relative z-30"
        style={{
          background: 'rgba(255, 247, 246, 0.4)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        }}
      >
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Admin Login
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Please sign in to continue
        </p>

        {/* Demo Credentials */}
        <div 
          className="rounded-lg p-3 mb-6 border"
          style={{
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
          }}
        >
          <p className="text-sm font-medium text-blue-800 mb-1">Demo Credentials:</p>
          <p className="text-xs text-blue-700">Email: admin@example.com</p>
          <p className="text-xs text-blue-700">Password: admin123</p>
        </div>

        {/* Error Message */}
        {error && (
          <div 
            className="rounded-lg p-3 mb-4 border"
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
            }}
          >
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F18372] transition-all placeholder-gray-500"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              color: '#374151',
            }}
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F18372] transition-all placeholder-gray-500"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              color: '#374151',
            }}
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 text-white rounded-lg cursor-pointer font-medium transition-all transform hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #F18372, #f75138)',
            boxShadow: '0 4px 20px rgba(241, 131, 114, 0.5)',
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;