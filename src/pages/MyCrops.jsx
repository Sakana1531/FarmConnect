// src/pages/MyCrops.jsx
import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";

const MyCrops = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const savedCrops = JSON.parse(localStorage.getItem("farmerCrops")) || [];
    setCrops(savedCrops);
  }, []);

  const handleDelete = (index) => {
    const updated = crops.filter((_, i) => i !== index);
    setCrops(updated);
    localStorage.setItem("farmerCrops", JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    alert(`Edit feature coming soon for ${crops[index].cropName}`);
  };

  return (
    <div className="my-crops-container">
      <h2>My Crops</h2>

      {crops.length === 0 ? (
        <p className="no-crops">No crops added yet!</p>
      ) : (
        <div className="crops-grid">
          {crops.map((crop, index) => (
            <div key={index} className="crop-card">
              <img src={crop.image} alt={crop.cropName} className="crop-image" />
              <h3>{crop.cropName}</h3>
              <p>{crop.description}</p>
              <p>
                <strong>Price:</strong> ₹{crop.price}/kg
              </p>
              <p>
                <strong>Quantity:</strong> {crop.quantity} kg
              </p>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCrops;
