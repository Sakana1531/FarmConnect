import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ConsumerDashboard.css";

export default function ConsumerDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [availableCrops, setAvailableCrops] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const crops = JSON.parse(localStorage.getItem("farmerCrops")) || [];
    setAvailableCrops(crops);
  }, []);

  const filteredCrops = availableCrops.filter((crop) =>
    crop.cropName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleCropClick = (index) => {
    navigate(`/crop/${index}`);
  };

  return (
    <div className="consumer-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate("/")}>
            🌱 Farm Connect
          </div>
          
          {/* Search Bar */}
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search for fresh crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="header-actions">
            <button className="cart-btn" onClick={() => navigate("/cart")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Cart</span>
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="welcome-section">
          <h1 className="page-title">Fresh from Local Farms 🌾</h1>
          <p className="page-subtitle">
            Discover organic, farm-fresh produce from trusted local farmers
          </p>
        </div>

        {/* Crops Grid */}
        <div className="crops-container">
          {filteredCrops.length > 0 ? (
            <div className="crops-grid">
              {filteredCrops.map((crop, index) => (
                <div
                  className="crop-card"
                  key={index}
                  onClick={() => handleCropClick(index)}
                >
                  <div className="crop-image-wrapper">
                    <img src={crop.image} alt={crop.cropName} className="crop-image" />
                    <div className="crop-badge">Fresh</div>
                  </div>
                  
                  <div className="crop-info">
                    <h3 className="crop-name">{crop.cropName}</h3>
                    <p className="crop-description">{crop.description || "Fresh organic produce"}</p>
                    
                    <div className="crop-details">
                      <div className="price-tag">
                        <span className="price">₹{crop.price}</span>
                        <span className="unit">/ kg</span>
                      </div>
                      <div className="quantity-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 7h-9"></path>
                          <path d="M14 17H5"></path>
                          <circle cx="17" cy="17" r="3"></circle>
                          <circle cx="7" cy="7" r="3"></circle>
                        </svg>
                        <span>{crop.quantity} kg</span>
                      </div>
                    </div>

                    <button className="view-btn">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-crops">
              <div className="no-crops-icon">🌾</div>
              <h3>No crops available</h3>
              <p>Check back later for fresh produce from local farmers</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}