const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("./database"); // Add this line to connect to database

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Import routes with correct paths
const authRoutes = require("./app/auth/auth.controller"); // Updated path
const userRoutes = require("./app/user/user.controller");
const inventoryRoutes = require("./app/inventory/inventory.controller");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);

// Serve frontend files
const frontendPath = path.join(__dirname, "Frontend", "dist");
app.use(express.static(frontendPath));

// Fallback route for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;
