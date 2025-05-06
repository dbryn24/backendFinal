const express = require("express");
const router = express.Router();
const { getAllCategories, getCategoryById } = require("./category.service");

router.get("/", async (req, res) => {
  try {
    console.log("Fetching categories...");
    const categories = await getAllCategories();
    console.log("Categories found:", categories.length, "items:", categories);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
