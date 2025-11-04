// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import FarmerDashboard from "./pages/FarmerDashboard";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import AddCrop from "./pages/AddCrop";
import MyCrops from "./pages/MyCrops";
import AvailableCrops from "./pages/AvailableCrops";
import CropDetails from "./pages/CropDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Farmer Routes */}
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/add-crop" element={<AddCrop />} />
        <Route path="/my-crops" element={<MyCrops />} />

        {/* Consumer Routes */}
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        <Route path="/available-crops" element={<AvailableCrops />} />
        <Route path="/crop/:id" element={<CropDetails />} /> {/* ✅ Fixed dynamic route */}
        <Route path="/cart" element={<Cart />} />

        {/* Fallback route (optional but recommended) */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;