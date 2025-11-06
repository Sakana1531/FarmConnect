import React, { useState } from "react";
import "../../styles/Admin/CropManagement.css";

export default function CropManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // 'view' or 'edit'

  // Sample crop data
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "Rajesh Kumar",
      category: "Vegetables",
      quantity: "500 kg",
      price: "₹40/kg",
      status: "active",
      location: "Coimbatore",
      description: "Fresh organic tomatoes grown without pesticides",
      harvestDate: "2024-10-15",
      image: "🍅"
    },
    {
      id: 2,
      name: "Basmati Rice",
      farmer: "Priya Sharma",
      category: "Grains",
      quantity: "1000 kg",
      price: "₹80/kg",
      status: "active",
      location: "Salem",
      description: "Premium quality basmati rice",
      harvestDate: "2024-09-20",
      image: "🌾"
    },
    {
      id: 3,
      name: "Fresh Mangoes",
      farmer: "Suresh Patel",
      category: "Fruits",
      quantity: "300 kg",
      price: "₹100/kg",
      status: "pending",
      location: "Madurai",
      description: "Alphonso mangoes from organic farm",
      harvestDate: "2024-10-25",
      image: "🥭"
    },
    {
      id: 4,
      name: "Green Chillies",
      farmer: "Lakshmi Devi",
      category: "Vegetables",
      quantity: "200 kg",
      price: "₹60/kg",
      status: "active",
      location: "Trichy",
      description: "Spicy green chillies, fresh harvest",
      harvestDate: "2024-10-18",
      image: "🌶️"
    },
    {
      id: 5,
      name: "Coconuts",
      farmer: "Murugan Swamy",
      category: "Fruits",
      quantity: "800 units",
      price: "₹35/unit",
      status: "inactive",
      location: "Pollachi",
      description: "Fresh tender coconuts",
      harvestDate: "2024-10-10",
      image: "🥥"
    },
    {
      id: 6,
      name: "Wheat",
      farmer: "Arjun Singh",
      category: "Grains",
      quantity: "2000 kg",
      price: "₹30/kg",
      status: "active",
      location: "Erode",
      description: "High quality wheat grains",
      harvestDate: "2024-09-15",
      image: "🌾"
    }
  ]);

  // Filter crops based on search and filters
  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || crop.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || crop.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Handle view crop
  const handleView = (crop) => {
    setSelectedCrop(crop);
    setModalMode("view");
    setIsModalOpen(true);
  };

  // Handle edit crop
  const handleEdit = (crop) => {
    setSelectedCrop({ ...crop });
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // Handle delete crop
  const handleDelete = (cropId) => {
    if (window.confirm("Are you sure you want to delete this crop?")) {
      setCrops(crops.filter((crop) => crop.id !== cropId));
      alert("Crop deleted successfully!");
    }
  };

  // Handle approve crop
  const handleApprove = (cropId) => {
    setCrops(
      crops.map((crop) =>
        crop.id === cropId ? { ...crop, status: "active" } : crop
      )
    );
    alert("Crop approved successfully!");
  };

  // Handle reject crop
  const handleReject = (cropId) => {
    if (window.confirm("Are you sure you want to reject this crop?")) {
      setCrops(
        crops.map((crop) =>
          crop.id === cropId ? { ...crop, status: "inactive" } : crop
        )
      );
      alert("Crop rejected!");
    }
  };

  // Handle save edit
  const handleSaveEdit = () => {
    setCrops(
      crops.map((crop) =>
        crop.id === selectedCrop.id ? selectedCrop : crop
      )
    );
    setIsModalOpen(false);
    alert("Crop updated successfully!");
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCrop(null);
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "status-active";
      case "pending":
        return "status-pending";
      case "inactive":
        return "status-inactive";
      default:
        return "";
    }
  };

  return (
    <div className="crop-management">
      {/* Header with Stats */}
      <div className="crop-stats">
        <div className="stat-card">
          <div className="stat-icon">🌾</div>
          <div className="stat-info">
            <h3>{crops.length}</h3>
            <p>Total Crops</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{crops.filter((c) => c.status === "active").length}</h3>
            <p>Active Crops</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{crops.filter((c) => c.status === "pending").length}</h3>
            <p>Pending Approval</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h3>{crops.filter((c) => c.status === "inactive").length}</h3>
            <p>Inactive Crops</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="crop-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search crops, farmer, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Grains">Grains</option>
          </select>
        </div>
      </div>

      {/* Crops Table */}
      <div className="crop-table-container">
        <table className="crop-table">
          <thead>
            <tr>
              <th>Crop</th>
              <th>Farmer</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop) => (
                <tr key={crop.id}>
                  <td>
                    <div className="crop-info">
                      <span className="crop-icon">{crop.image}</span>
                      <span>{crop.name}</span>
                    </div>
                  </td>
                  <td>{crop.farmer}</td>
                  <td>{crop.category}</td>
                  <td>{crop.quantity}</td>
                  <td className="price">{crop.price}</td>
                  <td>{crop.location}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(crop.status)}`}>
                      {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-view"
                        onClick={() => handleView(crop)}
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(crop)}
                        title="Edit Crop"
                      >
                        ✏️
                      </button>
                      {crop.status === "pending" && (
                        <>
                          <button
                            className="btn-approve"
                            onClick={() => handleApprove(crop.id)}
                            title="Approve Crop"
                          >
                            ✅
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() => handleReject(crop.id)}
                            title="Reject Crop"
                          >
                            ❌
                          </button>
                        </>
                      )}
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(crop.id)}
                        title="Delete Crop"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-results">
                  No crops found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for View/Edit */}
      {isModalOpen && selectedCrop && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modalMode === "view" ? "Crop Details" : "Edit Crop"}
              </h2>
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {modalMode === "view" ? (
                // View Mode
                <div className="crop-details">
                  <div className="detail-row">
                    <span className="detail-label">Crop Icon:</span>
                    <span className="crop-icon-large">{selectedCrop.image}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Crop Name:</span>
                    <span>{selectedCrop.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Farmer:</span>
                    <span>{selectedCrop.farmer}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span>{selectedCrop.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Quantity:</span>
                    <span>{selectedCrop.quantity}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Price:</span>
                    <span className="price">{selectedCrop.price}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span>{selectedCrop.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Harvest Date:</span>
                    <span>{selectedCrop.harvestDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${getStatusClass(selectedCrop.status)}`}>
                      {selectedCrop.status.charAt(0).toUpperCase() + selectedCrop.status.slice(1)}
                    </span>
                  </div>
                  <div className="detail-row full-width">
                    <span className="detail-label">Description:</span>
                    <p>{selectedCrop.description}</p>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="crop-form">
                  <div className="form-group">
                    <label>Crop Name:</label>
                    <input
                      type="text"
                      value={selectedCrop.name}
                      onChange={(e) =>
                        setSelectedCrop({ ...selectedCrop, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Category:</label>
                    <select
                      value={selectedCrop.category}
                      onChange={(e) =>
                        setSelectedCrop({ ...selectedCrop, category: e.target.value })
                      }
                    >
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Grains">Grains</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Quantity:</label>
                    <input
                      type="text"
                      value={selectedCrop.quantity}
                      onChange={(e) =>
                        setSelectedCrop({ ...selectedCrop, quantity: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Price:</label>
                    <input
                      type="text"
                      value={selectedCrop.price}
                      onChange={(e) =>
                        setSelectedCrop({ ...selectedCrop, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Location:</label>
                    <input
                      type="text"
                      value={selectedCrop.location}
                      onChange={(e) =>
                        setSelectedCrop({ ...selectedCrop, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Harvest Date:</label>
                    <input
                      type="date"
                      value={selectedCrop.harvestDate}
                      onChange={(e) =>
                        setSelectedCrop({ ...selectedCrop, harvestDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Status:</label>
                    <select
                      value={selectedCrop.status}
                      onChange={(e) =>
                        setSelectedCrop({ ...selectedCrop, status: e.target.value })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Description:</label>
                    <textarea
                      value={selectedCrop.description}
                      onChange={(e) =>
                        setSelectedCrop({ ...selectedCrop, description: e.target.value })
                      }
                      rows="3"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {modalMode === "edit" && (
                <button className="btn-save" onClick={handleSaveEdit}>
                  💾 Save Changes
                </button>
              )}
              <button className="btn-cancel" onClick={closeModal}>
                {modalMode === "view" ? "Close" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}