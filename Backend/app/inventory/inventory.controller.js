const express = require("express");
const router = express.Router();

// Inventory routes
router.get("/", (req, res) => {
  res.json({ message: "Inventory routes working" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create inventory item" });
});

module.exports = router;
