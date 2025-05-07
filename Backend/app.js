const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("./database");

const app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
const authRoutes = require("./app/auth/auth.controller");
const userRoutes = require("./app/user/user.controller"); // Fixed path
const inventoryRoutes = require("./app/inventory/inventory.controller");
const categoryRoutes = require("./app/category/category.controller"); // Tambah ini
const productRoutes = require("./app/product/product.controller"); // Added product routes
const supplierRoutes = require("./app/supplier/supplier.controller");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/category", categoryRoutes); // Tambah ini
app.use("/api/products", productRoutes); // Added product routes
app.use("/api/supplier", supplierRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Remove or comment out the frontend serving code for development
// const frontendPath = path.join(__dirname, "Frontend", "dist");
// app.use(express.static(frontendPath));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

module.exports = app;
