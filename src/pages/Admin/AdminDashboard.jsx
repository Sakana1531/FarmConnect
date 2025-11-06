import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import CropManagement from "./CropManagement";
import OrderManagement from "./OrderManagement";
import "../../styles/Admin/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Sample statistics data
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12.5%",
      icon: "👥",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "Total Farmers",
      value: "456",
      change: "+8.2%",
      icon: "🌾",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      title: "Total Consumers",
      value: "778",
      change: "+15.3%",
      icon: "🛒",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      title: "Total Crops",
      value: "892",
      change: "+23.1%",
      icon: "🌱",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      title: "Total Revenue",
      value: "₹2.4M",
      change: "+18.7%",
      icon: "💰",
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      title: "Active Orders",
      value: "156",
      change: "+5.4%",
      icon: "📦",
      color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate("/admin/login");
  };

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "users":
        return <UserManagement />;
      
      case "crops":
        return <CropManagement />;
      
      case "orders":
        return <OrderManagement />;
      
      case "settings":
        return (
          <section className="content-section">
            <h2 className="section-title">⚙️ Settings</h2>
            <p className="placeholder-text">Settings features coming in Step 5...</p>
          </section>
        );
      
      default: // dashboard
        return (
          <>
            {/* Statistics Cards */}
            <section className="stats-section">
              {stats.map((stat, index) => (
                <div className="stat-card" key={index}>
                  <div className="stat-icon" style={{ background: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">{stat.title}</h3>
                    <p className="stat-value">{stat.value}</p>
                    <span className="stat-change positive">{stat.change} from last month</span>
                  </div>
                </div>
              ))}
            </section>

            {/* Quick Actions */}
            <section className="quick-actions">
              <h2 className="section-title">Quick Actions</h2>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => setActiveMenu("users")}>
                  <span className="action-icon">➕</span>
                  <span>Manage Users</span>
                </button>
                <button className="action-btn" onClick={() => setActiveMenu("crops")}>
                  <span className="action-icon">✅</span>
                  <span>Manage Crops</span>
                </button>
                <button className="action-btn" onClick={() => setActiveMenu("orders")}>
                  <span className="action-icon">📦</span>
                  <span>Manage Orders</span>
                </button>
                <button className="action-btn">
                  <span className="action-icon">📊</span>
                  <span>View Reports</span>
                </button>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="content-section">
              <h2 className="section-title">📊 Recent Activity</h2>
              <p className="placeholder-text">Recent activity feed will be displayed here...</p>
            </section>
          </>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="logo-icon">🌱</span>
          <span className="logo-text">Farm Connect</span>
        </div>

        <nav className="admin-nav">
          <button
            className={`nav-item ${activeMenu === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveMenu("dashboard")}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </button>

          <button
            className={`nav-item ${activeMenu === "users" ? "active" : ""}`}
            onClick={() => setActiveMenu("users")}
          >
            <span className="nav-icon">👥</span>
            <span className="nav-text">Users</span>
          </button>

          <button
            className={`nav-item ${activeMenu === "crops" ? "active" : ""}`}
            onClick={() => setActiveMenu("crops")}
          >
            <span className="nav-icon">🌾</span>
            <span className="nav-text">Crops</span>
          </button>

          <button
            className={`nav-item ${activeMenu === "orders" ? "active" : ""}`}
            onClick={() => setActiveMenu("orders")}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">Orders</span>
          </button>

          <button
            className={`nav-item ${activeMenu === "settings" ? "active" : ""}`}
            onClick={() => setActiveMenu("settings")}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </button>

          <button className="nav-item logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left">
            <h1 className="page-title">
              {activeMenu === "dashboard" && "Dashboard Overview"}
              {activeMenu === "users" && "User Management"}
              {activeMenu === "crops" && "Crop Management"}
              {activeMenu === "orders" && "Order Management"}
              {activeMenu === "settings" && "Settings"}
            </h1>
            <p className="page-subtitle">
              {activeMenu === "dashboard" && "Welcome back, Admin! Here's what's happening today."}
              {activeMenu === "users" && "Manage all farmers and consumers in your platform."}
              {activeMenu === "crops" && "Monitor and manage all crop listings."}
              {activeMenu === "orders" && "Track and manage all orders."}
              {activeMenu === "settings" && "Configure your platform settings."}
            </p>
          </div>
          <div className="header-right">
            <div className="admin-profile">
              <span className="profile-icon">👤</span>
              <span className="profile-name">Admin</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content Based on Active Menu */}
        {renderContent()}
      </main>
    </div>
  );
}