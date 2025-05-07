const express = require("express");
const router = express.Router();
const { login, register } = require("./auth.service");
const { authenticate } = require("./auth.middleware");

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both username and password",
      });
    }

    // Process login
    const authData = await login(username, password);

    // Return success with token and user data
    res.json({
      success: true,
      message: "Login successful",
      token: authData.token,
      user: authData.user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({
      success: false,
      message: error.message || "Invalid credentials",
    });
  }
});

// Register route
router.post("/register", async (req, res) => {
  try {
    // Process registration
    const authData = await register(req.body);

    // Return success with token and user data
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: authData.token,
      user: authData.user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
});

// Verify token route - useful for frontend to check if token is still valid
router.get("/verify", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
