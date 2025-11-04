import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [proof, setProof] = useState("");
  const navigate = useNavigate();

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProof(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      alert("❌ Email not registered or incorrect password!");
      return;
    }

    if (!role) {
      alert("❌ Please select a role!");
      return;
    }

    if (role === "Farmer" && !proof) {
      alert("❌ Please upload your ID proof!");
      return;
    }

    const loggedInUser = {
      ...user,
      role,
      proof: role === "Farmer" ? proof : null,
    };

    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));

    alert(`✅ Welcome back, ${user.fullName || 'User'}!`);

    if (role === "Farmer") {
      navigate("/farmer-dashboard");
    } else {
      navigate("/consumer-dashboard");
    }
  };

  return (
    <div className="login-page">
      {/* Left Section - Branding */}
      <div className="login-left">
        <div className="brand-content">
          <h1 className="brand-logo">🌱 Farm Connect</h1>
          <h2 className="brand-tagline">Welcome Back!</h2>
          <p className="brand-description">
            Login to access fresh, organic produce directly from local farmers.
            Continue supporting sustainable agriculture and healthy communities.
          </p>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Fresh produce from local farms</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Fast delivery within 24 hours</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Quality assured organic products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="login-right">
        <div className="login-form-container">
          <h2 className="form-title">Login to Your Account</h2>
          <p className="form-subtitle">Continue your journey with Farm Connect</p>

          <form onSubmit={handleLogin} className="login-form">
            {/* Role Selection */}
            <div className="role-selection">
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="Consumer"
                  checked={role === "Consumer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <div className="role-card">
                  <span className="role-icon">🛒</span>
                  <span className="role-label">Consumer</span>
                </div>
              </label>

              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="Farmer"
                  checked={role === "Farmer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <div className="role-card">
                  <span className="role-icon">🌾</span>
                  <span className="role-label">Farmer</span>
                </div>
              </label>
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ID Proof Upload (Only for Farmers) */}
            {role === "Farmer" && (
              <div className="form-group">
                <label htmlFor="proof">
                  Upload ID Proof <span className="required">*</span>
                </label>
                <div className="file-upload-wrapper">
                  <input
                    id="proof"
                    type="file"
                    accept="image/*"
                    onChange={handleProofUpload}
                    className="file-input"
                  />
                  <div className="file-upload-label">
                    {proof ? (
                      <>
                        <span className="upload-icon">✓</span>
                        <span>ID Proof Uploaded</span>
                      </>
                    ) : (
                      <>
                        <span className="upload-icon">📁</span>
                        <span>Choose file to upload</span>
                      </>
                    )}
                  </div>
                </div>
                {proof && (
                  <div className="proof-preview">
                    <img src={proof} alt="ID Proof Preview" />
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="login-btn">
              Login
            </button>

            {/* Forgot Password */}
            <div className="forgot-password">
              <span className="link">Forgot Password?</span>
            </div>
          </form>

          {/* Register Link */}
          <div className="form-footer">
            <p>
              Don't have an account?{" "}
              <span className="link" onClick={() => navigate("/register")}>
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}