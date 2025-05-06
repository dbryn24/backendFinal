import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi sign up (gunakan fetch jika backend tersedia)
    if (username && password) {
      // Simpan data pengguna (contoh sederhana)
      alert("Account created successfully!");
      navigate("/login");
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h1>Join Us</h1>
        <p>
          Create an account to access all features and manage your tasks
          efficiently.
        </p>
      </div>
      <div className="login-right">
        <form onSubmit={handleSignUp} className="login-form">
          <h2>Sign Up</h2>
          {error && <p className="login-error">{error}</p>}
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
          <button type="submit" className="login-btn">
            SIGN UP
          </button>
          <p className="signup-link">
            Already have an account?{" "}
            <span
              className="link"
              onClick={() => navigate("/login")}
              style={{ color: "#007bff", cursor: "pointer" }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
