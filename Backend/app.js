const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Database connection - only require this, don't call mongoose.connect() again
require("./database");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    // Perbaikan: Tambahkan pengaturan header yang diperbolehkan
    exposedHeaders: ["Content-Type", "Accept"],
  })
);

// Middleware untuk memastikan semua respons memiliki header Content-Type yang benar
app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
const authRoutes = require("./app/auth/auth.controller");
const userRoutes = require("./app/user/user.controller");
const inventoryRoutes = require("./app/inventory/inventory.controller");
const categoryRoutes = require("./app/category/category.controller");
const productRoutes = require("./app/product/product.controller");
const supplierRoutes = require("./app/supplier/supplier.controller");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/supplier", supplierRoutes);

// Error handler untuk rute yang tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
