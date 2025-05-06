const express = require("express");
const router = express.Router();
const Inventory = require("./inventory.model");
const { getAllItems, addItem } = require("./inventory.service");

// Inventory routes
router.get("/", async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItem = await addItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/test", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json({ message: "Connected to MongoDB", data: inventory });
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

module.exports = router;
