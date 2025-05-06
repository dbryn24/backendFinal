import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Index from "./home";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simpan status login ke localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Arahkan ke halaman utama
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h1>Welcome to InventKU</h1>
        <p>
          "Welcome to the Inventory Website. This platform helps you record,
          monitor, and manage stock data in real-time. Please log in to access
          features and manage your inventory efficiently.
        </p>
      </div>
      <div className="login-right">
        <form onSubmit={handleLogin} className="login-form">
          <h2>User Login</h2>
          <div className="form-group">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-footer">
            <label>
              <input type="checkbox" /> Remember
            </label>
            <span className="forgot">Forgot password?</span>
          </div>
          <button type="submit" className="login-btn">
            LOGIN
          </button>
          <p className="signup-link">
            Don't have an account?{" "}
            <span
              className="link"
              onClick={() => navigate("/signup")}
              style={{ color: "#007bff", cursor: "pointer" }}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
