import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig"; // adjust path
import Background from "../../assets/AdminBackground.jpg";
import BackgroundVideo from "../../assets/Video.mp4";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation function
  const validateForm = () => {
    const errors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!data.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(data.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!data.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    // Clear field-specific error when user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      // Firebase Authentication
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/admin"); // redirect on success
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(0.8) saturate(1.2)" }}
      >
        <source src={BackgroundVideo} type="video/mp4" />
      </video>

      {/* Glassy overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))",
          backdropFilter: "blur(1px)",
        }}
      />

      {/* Login Box */}
      <div
        className="w-90 max-w-md rounded-2xl shadow-2xl px-8 py-10 relative z-30"
        style={{
          background: "rgba(255, 247, 246, 0.4)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Admin Login
        </h1>
        <p className="text-gray-800 text-sm text-center mb-6">
          Please sign in to continue
        </p>

        {/* Error Message */}
        {error && (
          <div
            className="rounded-lg p-3 mb-4 border"
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
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
            className={`w-full px-4 py-3 text-white rounded-lg focus:outline-none focus:ring-2 transition-all placeholder-white ${
              fieldErrors.email 
                ? "focus:ring-red-500 border border-red-500" 
                : "focus:ring-[#F18372]"
            }`}
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          {fieldErrors.email && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all placeholder-white ${
              fieldErrors.password 
                ? "focus:ring-red-500 border border-red-500" 
                : "focus:ring-[#F18372]"
            }`}
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
          {fieldErrors.password && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 text-white rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #F18372, #f75138)",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;