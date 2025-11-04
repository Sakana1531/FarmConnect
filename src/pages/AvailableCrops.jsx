// src/pages/AvailableCrops.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function AvailableCrops() {
  const [search, setSearch] = useState("");
  const [filteredCrops, setFilteredCrops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const crops = JSON.parse(localStorage.getItem("farmerCrops")) || [];
    setFilteredCrops(crops);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const crops = JSON.parse(localStorage.getItem("farmerCrops")) || [];
    const filtered = crops.filter((crop) =>
      crop.cropName.toLowerCase().includes(value)
    );
    setFilteredCrops(filtered);
  };

  // ✅ Navigate to dynamic route /crop/:id
  const handleViewDetails = (crop, index) => {
  localStorage.setItem("selectedCrop", JSON.stringify(crop));
  navigate(`/crop/${index}`); // ✅ Navigate to dynamic route
};


  return (
    <div className="dashboard-container">
      <h2>🌾 Available Crops</h2>

      <input
        type="text"
        placeholder="🔍 Search crops..."
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />

      <div className="crop-grid">
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop, index) => (
            <div
              key={index}
              className="crop-card"
              onClick={() => handleViewDetails(crop, index)} // ✅ add index
              style={{ cursor: "pointer" }}
            >
              <img src={crop.image} alt={crop.cropName} className="crop-img" />
              <h3>{crop.cropName}</h3>
              <p>
                <strong>Price:</strong> ₹{crop.price} /{" "}
                {crop.quantityType || "kg"}
              </p>
              <p>{crop.quantity} kg available</p>
            </div>
          ))
        ) : (
          <p>No crops found.</p>
        )}
      </div>
    </div>
  );
}
