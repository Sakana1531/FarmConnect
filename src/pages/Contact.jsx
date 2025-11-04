import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Contact.css";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("❌ Please fill in all required fields!");
      return;
    }

    const contactMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    contactMessages.push({
      ...formData,
      timestamp: new Date().toLocaleString(),
    });
    localStorage.setItem("contactMessages", JSON.stringify(contactMessages));

    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          🌱 Farm Connect
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Home
          </li>
          <li onClick={() => navigate("/about")} style={{ cursor: "pointer" }}>
            About
          </li>
          <li onClick={() => navigate("/contact")} style={{ cursor: "pointer" }}>
            Contact
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Get In Touch With Us</h1>
          <p>We'd love to hear from you. Send us a message anytime!</p>
        </div>
      </section>

      {/* Contact Container */}
      <div className="contact-container">
        {/* Left Side - Contact Info */}
        <div className="contact-info-section">
          <h2>Contact Information</h2>

          <div className="info-card">
            <div className="icon-box">📞</div>
            <div className="info-content">
              <h3>Phone</h3>
              <p>+91 8765 432 109</p>
              <p className="small-text">Mon-Fri, 9 AM - 6 PM</p>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box">✉️</div>
            <div className="info-content">
              <h3>Email</h3>
              <p>support@farmconnect.com</p>
              <p className="small-text">We'll respond within 24 hours</p>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box">📍</div>
            <div className="info-content">
              <h3>Address</h3>
              <p>123 Agricultural Road</p>
              <p>Tiruppur, Tamil Nadu 641 603</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-buttons">
              <button className="social-btn">Facebook</button>
              <button className="social-btn">Twitter</button>
              <button className="social-btn">Instagram</button>
              <button className="social-btn">LinkedIn</button>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>

          {submitted && (
            <div className="success-message">
              ✅ Thank you! Your message has been sent successfully. We'll get back to you soon!
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here... Tell us how we can help!"
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              📧 Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Farm Connect</h4>
            <ul>
              <li onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                Home
              </li>
              <li onClick={() => navigate("/about")} style={{ cursor: "pointer" }}>
                About Us
              </li>
              <li onClick={() => navigate("/contact")} style={{ cursor: "pointer" }}>
                Contact
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li onClick={() => navigate("/privacy")} style={{ cursor: "pointer" }}>
                Privacy Policy
              </li>
              <li>Terms & Conditions</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li>support@farmconnect.com</li>
              <li>+91 8765 432 109</li>
              <li>Tiruppur, Tamil Nadu</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Farm Connect. All rights reserved. 🌱</p>
        </div>
      </footer>
    </div>
  );
}