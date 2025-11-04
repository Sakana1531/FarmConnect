// src/pages/AddCrop.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const AddCrop = () => {
  const navigate = useNavigate();
  const [cropName, setCropName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cropName || !description || !price || !quantity || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const newCrop = {
      cropName,
      description,
      price,
      quantity,
      image,
    };

    const existingCrops = JSON.parse(localStorage.getItem("farmerCrops")) || [];
    existingCrops.push(newCrop);
    localStorage.setItem("farmerCrops", JSON.stringify(existingCrops));

    alert("Crop added successfully!");
    navigate("/my-crops");
  };

  return (
    <div className="dashboard-container">
      <h2>Add New Crop</h2>
      <form className="add-crop-form" onSubmit={handleSubmit}>
        <label>
          Crop Name <span className="required">*</span>
        </label>
        <input
          type="text"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          placeholder="Enter crop name"
        />

        <label>
          Description <span className="required">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        ></textarea>

        <label>
          Price per kg (₹) <span className="required">*</span>
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />

        <label>
          Quantity (kg) <span className="required">*</span>
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
        />

        <label>
          Upload Image <span className="required">*</span>
        </label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {image && (
          <div className="preview">
            <p>Preview:</p>
            <img src={image} alt="Crop Preview" className="preview-image" />
          </div>
        )}

        <button type="submit" className="btn-submit">
          Add Crop
        </button>
      </form>
    </div>
  );
};

export default AddCrop;
