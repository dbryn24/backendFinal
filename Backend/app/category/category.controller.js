const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
} = require("./category.service");

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

router.post("/", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // Log the request body
    const newCategory = await createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
