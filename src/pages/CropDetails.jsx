// src/pages/CropDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../styles/cropdetails.css";

const CropDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Check if crop data was passed via navigation state
    if (location.state?.crop) {
      setCrop(location.state.crop);
    } else {
      // Otherwise, fetch from localStorage
      const savedCrops = JSON.parse(localStorage.getItem("farmerCrops")) || [];
      if (savedCrops[id]) {
        setCrop(savedCrops[id]);
      } else {
        setCrop(null);
      }
    }
  }, [id, location.state]);

  const handleAddToCart = () => {
    if (!crop) return;

    const cartItem = {
      ...crop,
      quantity: quantity,
      totalPrice: crop.price * quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(
      (item) => item.cropName === crop.cropName
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
      existingCart[existingItemIndex].totalPrice =
        existingCart[existingItemIndex].quantity * crop.price;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${crop.cropName} added to cart!`);
  };

  const handleGoBack = () => {
    if (location.state?.fromMycrops) {
      navigate("/my-crops");
    } else {
      navigate("/available-crops");
    }
  };

  if (!crop) {
    return (
      <div className="crop-details-container">
        <div className="not-found">
          <h2>Crop not found</h2>
          <button className="back-btn" onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="crop-details-page">
      <div className="crop-details-header">
        <button className="back-btn" onClick={handleGoBack}>
          ← Back
        </button>
      </div>

      <div className="crop-details-container">
        <div className="crop-details-content">
          <div className="crop-image-section">
            <img src={crop.image} alt={crop.cropName} className="crop-detail-image" />
          </div>

          <div className="crop-info-section">
            <h1 className="crop-title">{crop.cropName}</h1>
            
            <div className="crop-meta">
              <span className="crop-date">
                Cultivated {crop.description}
              </span>
            </div>

            <div className="crop-details-grid">
              <div className="detail-item">
                <span className="detail-label">Price per kg</span>
                <span className="detail-value price">₹{crop.price}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Available Quantity</span>
                <span className="detail-value">{crop.quantity} kg</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Total Value</span>
                <span className="detail-value">₹{crop.price * crop.quantity}</span>
              </div>
            </div>

            {!location.state?.fromMycrops && (
              <div className="purchase-section">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Select Quantity (kg):</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={crop.quantity}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(crop.quantity, Math.max(1, Number(e.target.value))))}
                      className="qty-input"
                    />
                    <button 
                      onClick={() => setQuantity(Math.min(crop.quantity, quantity + 1))}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="total-price-box">
                  <span className="total-label">Total Amount:</span>
                  <span className="total-amount">₹{crop.price * quantity}</span>
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  🛒 Add to Cart
                </button>
              </div>
            )}

            {location.state?.fromMycrops && (
              <div className="owner-badge">
                <p>✓ This is your crop listing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;