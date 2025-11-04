import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CropDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    const crops = JSON.parse(localStorage.getItem("farmerCrops")) || [];
    if (id >= 0 && id < crops.length) {
      setCrop(crops[id]);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!crop) return;

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = [...existingCart, crop];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    alert("✅ Crop added to cart!");
    navigate("/cart"); // Optional: automatically go to cart
  };

  if (!crop) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>No crop selected.</p>
        <button
          onClick={() => navigate("/available-crops")}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <img
        src={crop.image}
        alt={crop.cropName}
        style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
      />
      <h2>{crop.cropName}</h2>
      <p>
        <strong>Price:</strong> ₹{crop.price} / {crop.quantityType || "kg"}
      </p>
      <p>
        <strong>Available:</strong> {crop.quantity} kg
      </p>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleAddToCart}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          🛒 Add to Cart
        </button>

        <button
          onClick={() => navigate("/available-crops")}
          style={{
            backgroundColor: "gray",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
