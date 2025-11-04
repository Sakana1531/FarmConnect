import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FarmerDashboard.css";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="farmer-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate("/")}>
            🌱 Farm Connect
          </div>
          <div className="header-right">
            <span className="user-greeting">Welcome, {user?.fullName || user?.name || "Farmer"}</span>
            <button className="logout-btn" onClick={handleLogout}>
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="welcome-section">
          <h1 className="welcome-title">Farmer Dashboard 👨‍🌾</h1>
          <p className="welcome-subtitle">
            Manage your crops, track inventory, and connect with consumers
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          {/* Add Crop Card */}
          <div className="dashboard-card add-crop-card" onClick={() => navigate("/add-crop")}>
            <div className="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <h3 className="card-title">Add New Crop</h3>
            <p className="card-description">List a new crop for sale and reach potential buyers</p>
            <div className="card-action">
              <span>Get Started →</span>
            </div>
          </div>

          {/* My Crops Card */}
          <div className="dashboard-card my-crops-card" onClick={() => navigate("/my-crops")}>
            <div className="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <h3 className="card-title">My Crops</h3>
            <p className="card-description">View, edit, and manage all your listed crops</p>
            <div className="card-action">
              <span>View Crops →</span>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="dashboard-card analytics-card">
            <div className="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </div>
            <h3 className="card-title">Sales Analytics</h3>
            <p className="card-description">Track your sales performance and revenue</p>
            <div className="card-action">
              <span>Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon">🌾</div>
            <div className="stat-content">
              <h4>Total Crops</h4>
              <p className="stat-value">{JSON.parse(localStorage.getItem("farmerCrops") || "[]").length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h4>Active Listings</h4>
              <p className="stat-value">{JSON.parse(localStorage.getItem("farmerCrops") || "[]").length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h4>Status</h4>
              <p className="stat-value">Active</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerDashboard;