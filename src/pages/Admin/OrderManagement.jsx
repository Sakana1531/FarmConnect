import React, { useState } from "react";
import "../../styles/Admin/OrderManagement.css";

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "Arun Kumar",
      farmer: "Rajesh Kumar",
      crop: "Organic Tomatoes",
      quantity: "50 kg",
      totalPrice: "₹2,000",
      status: "pending",
      orderDate: "2024-11-01",
      deliveryDate: "2024-11-08",
      paymentMethod: "UPI",
      deliveryAddress: "123 MG Road, Coimbatore, Tamil Nadu",
      phone: "+91 98765 43210"
    },
    {
      id: "ORD-002",
      customer: "Priya Sharma",
      farmer: "Suresh Patel",
      crop: "Fresh Mangoes",
      quantity: "30 kg",
      totalPrice: "₹3,000",
      status: "processing",
      orderDate: "2024-10-30",
      deliveryDate: "2024-11-06",
      paymentMethod: "Card",
      deliveryAddress: "456 Anna Salai, Chennai, Tamil Nadu",
      phone: "+91 98765 43211"
    },
    {
      id: "ORD-003",
      customer: "Vijay Raj",
      farmer: "Lakshmi Devi",
      crop: "Green Chillies",
      quantity: "20 kg",
      totalPrice: "₹1,200",
      status: "shipped",
      orderDate: "2024-10-28",
      deliveryDate: "2024-11-05",
      paymentMethod: "Cash on Delivery",
      deliveryAddress: "789 Gandhi Street, Madurai, Tamil Nadu",
      phone: "+91 98765 43212"
    },
    {
      id: "ORD-004",
      customer: "Meera Nair",
      farmer: "Arjun Singh",
      crop: "Wheat",
      quantity: "100 kg",
      totalPrice: "₹3,000",
      status: "delivered",
      orderDate: "2024-10-25",
      deliveryDate: "2024-11-01",
      paymentMethod: "UPI",
      deliveryAddress: "321 Beach Road, Kochi, Kerala",
      phone: "+91 98765 43213"
    },
    {
      id: "ORD-005",
      customer: "Karthik Menon",
      farmer: "Murugan Swamy",
      crop: "Coconuts",
      quantity: "50 units",
      totalPrice: "₹1,750",
      status: "cancelled",
      orderDate: "2024-10-27",
      deliveryDate: "2024-11-04",
      paymentMethod: "UPI",
      deliveryAddress: "555 Temple Street, Trichy, Tamil Nadu",
      phone: "+91 98765 43214"
    },
    {
      id: "ORD-006",
      customer: "Divya Reddy",
      farmer: "Priya Sharma",
      crop: "Basmati Rice",
      quantity: "75 kg",
      totalPrice: "₹6,000",
      status: "processing",
      orderDate: "2024-11-02",
      deliveryDate: "2024-11-09",
      paymentMethod: "Card",
      deliveryAddress: "888 Park Avenue, Bangalore, Karnataka",
      phone: "+91 98765 43215"
    }
  ]);

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.crop.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle view order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Handle update order status
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    // Update selected order if modal is open
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    
    alert(`Order ${orderId} status updated to ${newStatus}!`);
  };

  // Handle cancel order
  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      handleUpdateStatus(orderId, "cancelled");
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "shipped":
        return "status-shipped";
      case "delivered":
        return "status-delivered";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "processing":
        return "⚙️";
      case "shipped":
        return "🚚";
      case "delivered":
        return "✅";
      case "cancelled":
        return "❌";
      default:
        return "📦";
    }
  };

  return (
    <div className="order-management">
      {/* Header with Stats */}
      <div className="order-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{orders.filter((o) => o.status === "pending").length}</h3>
            <p>Pending Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚙️</div>
          <div className="stat-info">
            <h3>{orders.filter((o) => o.status === "processing").length}</h3>
            <p>Processing</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div className="stat-info">
            <h3>{orders.filter((o) => o.status === "shipped").length}</h3>
            <p>Shipped</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{orders.filter((o) => o.status === "delivered").length}</h3>
            <p>Delivered</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h3>{orders.filter((o) => o.status === "cancelled").length}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="order-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by Order ID, Customer, Farmer, or Crop..."
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="order-table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Farmer</th>
              <th>Crop</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.farmer}</td>
                  <td>{order.crop}</td>
                  <td>{order.quantity}</td>
                  <td className="price">{order.totalPrice}</td>
                  <td>{order.orderDate}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-view"
                        onClick={() => handleViewOrder(order)}
                        title="View Details"
                      >
                        👁️
                      </button>
                      {order.status === "pending" && (
                        <button
                          className="btn-process"
                          onClick={() => handleUpdateStatus(order.id, "processing")}
                          title="Start Processing"
                        >
                          ⚙️
                        </button>
                      )}
                      {order.status === "processing" && (
                        <button
                          className="btn-ship"
                          onClick={() => handleUpdateStatus(order.id, "shipped")}
                          title="Mark as Shipped"
                        >
                          🚚
                        </button>
                      )}
                      {order.status === "shipped" && (
                        <button
                          className="btn-deliver"
                          onClick={() => handleUpdateStatus(order.id, "delivered")}
                          title="Mark as Delivered"
                        >
                          ✅
                        </button>
                      )}
                      {order.status !== "delivered" && order.status !== "cancelled" && (
                        <button
                          className="btn-cancel"
                          onClick={() => handleCancelOrder(order.id)}
                          title="Cancel Order"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-results">
                  No orders found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details - {selectedOrder.id}</h2>
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {/* Order Status Timeline */}
              <div className="order-timeline">
                <h3>Order Status</h3>
                <div className="timeline">
                  <div className={`timeline-step ${["pending", "processing", "shipped", "delivered"].includes(selectedOrder.status) ? "completed" : ""}`}>
                    <div className="step-icon">⏳</div>
                    <div className="step-label">Pending</div>
                  </div>
                  <div className={`timeline-line ${["processing", "shipped", "delivered"].includes(selectedOrder.status) ? "completed" : ""}`}></div>
                  <div className={`timeline-step ${["processing", "shipped", "delivered"].includes(selectedOrder.status) ? "completed" : ""}`}>
                    <div className="step-icon">⚙️</div>
                    <div className="step-label">Processing</div>
                  </div>
                  <div className={`timeline-line ${["shipped", "delivered"].includes(selectedOrder.status) ? "completed" : ""}`}></div>
                  <div className={`timeline-step ${["shipped", "delivered"].includes(selectedOrder.status) ? "completed" : ""}`}>
                    <div className="step-icon">🚚</div>
                    <div className="step-label">Shipped</div>
                  </div>
                  <div className={`timeline-line ${selectedOrder.status === "delivered" ? "completed" : ""}`}></div>
                  <div className={`timeline-step ${selectedOrder.status === "delivered" ? "completed" : ""}`}>
                    <div className="step-icon">✅</div>
                    <div className="step-label">Delivered</div>
                  </div>
                </div>
                {selectedOrder.status === "cancelled" && (
                  <div className="cancelled-message">
                    ❌ This order has been cancelled
                  </div>
                )}
              </div>

              {/* Order Information */}
              <div className="order-details">
                <div className="details-section">
                  <h3>📦 Order Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Order ID:</span>
                    <span>{selectedOrder.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Order Date:</span>
                    <span>{selectedOrder.orderDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Expected Delivery:</span>
                    <span>{selectedOrder.deliveryDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Payment Method:</span>
                    <span>{selectedOrder.paymentMethod}</span>
                  </div>
                </div>

                <div className="details-section">
                  <h3>👤 Customer Details</h3>
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span>{selectedOrder.customer}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span>{selectedOrder.phone}</span>
                  </div>
                  <div className="detail-row full-width">
                    <span className="detail-label">Delivery Address:</span>
                    <span>{selectedOrder.deliveryAddress}</span>
                  </div>
                </div>

                <div className="details-section">
                  <h3>🌾 Product Details</h3>
                  <div className="detail-row">
                    <span className="detail-label">Crop:</span>
                    <span>{selectedOrder.crop}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Farmer:</span>
                    <span>{selectedOrder.farmer}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Quantity:</span>
                    <span>{selectedOrder.quantity}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Total Price:</span>
                    <span className="price">{selectedOrder.totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Status Update Actions */}
              {selectedOrder.status !== "delivered" && selectedOrder.status !== "cancelled" && (
                <div className="status-actions">
                  <h3>Update Order Status</h3>
                  <div className="action-buttons-group">
                    {selectedOrder.status === "pending" && (
                      <button
                        className="btn-status-update processing"
                        onClick={() => handleUpdateStatus(selectedOrder.id, "processing")}
                      >
                        ⚙️ Start Processing
                      </button>
                    )}
                    {selectedOrder.status === "processing" && (
                      <button
                        className="btn-status-update shipped"
                        onClick={() => handleUpdateStatus(selectedOrder.id, "shipped")}
                      >
                        🚚 Mark as Shipped
                      </button>
                    )}
                    {selectedOrder.status === "shipped" && (
                      <button
                        className="btn-status-update delivered"
                        onClick={() => handleUpdateStatus(selectedOrder.id, "delivered")}
                      >
                        ✅ Mark as Delivered
                      </button>
                    )}
                    <button
                      className="btn-status-update cancelled"
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                    >
                      ❌ Cancel Order
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-close" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}