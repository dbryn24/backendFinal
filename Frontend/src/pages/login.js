import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style/login.css";
import { FaWarehouse, FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi login tanpa autentikasi
    setTimeout(() => {
      // Simpan status login di localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", formData.username);

      // Arahkan ke halaman home
      navigate("/home", { replace: true });
      setIsLoading(false);
    }, 1000); // Simulasi delay 1 detik
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <FaWarehouse className="logo-icon" />
            <h1 className="logo-text">InventKu</h1>
          </div>
          <p className="login-subtitle">
            Warehouses Inventory Management System
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">
              <FaUser className="input-icon" />
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="input-icon" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={`login-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <FaSignInAlt />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Make Our Work Easy</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
