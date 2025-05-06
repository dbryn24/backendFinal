// filepath: c:\Users\Acer\Back-END\Final\backendProject\app\user\inventory.controller.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "User Inventory Controller" });
});

module.exports = router;
