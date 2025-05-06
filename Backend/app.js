const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const usersController = require("./app/user/inventory.controller");
const inventoryController = require("./app/inventory/inventory.controller");
const authController = require("./app/user/auth.controller");
app.use("/api", authController);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Melayani file frontend
const frontendPath = path.join(__dirname, "Frontend", "dist"); // Sesuaikan folder build frontend
app.use(express.static(frontendPath));

// Rute fallback untuk SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use("/api", usersController);
app.use("/api", inventoryController);
