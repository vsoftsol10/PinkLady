import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate=useNavigate();
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
    <div className="min-h-screen flex items-center justify-center bg-[#F18372]/15 px-4">
      <div className="w-90  max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
        {/* Title */}
        <h1 className="text-4xl font-bold  text-center mb-2">
          Admin Login
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Please sign in to continue
        </p>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-sm font-medium text-blue-800 mb-1">Demo Credentials:</p>
          <p className="text-xs text-blue-600">Email: admin@example.com</p>
          <p className="text-xs text-blue-600">Password: admin123</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F18372] focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F18372] focus:border-transparent"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#F18372] text-white rounded-lg cursor-pointer font-medium hover:bg-[#f75138] transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;