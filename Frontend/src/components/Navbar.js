import React from "react";
import { Link } from "react-router-dom";
import {
  FaWarehouse,
  FaBoxes,
  FaTruck,
  FaTags,
  FaSignOutAlt,
  FaThLarge,
} from "react-icons/fa";
import "../assets/style/navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaWarehouse className="brand-icon" />
        <span className="brand-text">Inventory System</span>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          <FaThLarge className="nav-icon" />
          <span>All Categories</span>
        </Link>
        <Link to="/products" className="nav-link">
          <FaBoxes className="nav-icon" />
          <span>Products</span>
        </Link>
        <Link to="/suppliers" className="nav-link">
          <FaTruck className="nav-icon" />
          <span>Suppliers</span>
        </Link>
        <Link to="/categories" className="nav-link">
          <FaTags className="nav-icon" />
          <span>Categories</span>
        </Link>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        <FaSignOutAlt className="logout-icon" />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
