const express = require("express");
const router = express.Router();
const { getAllCategories, getCategoryById } = require("./category.service");

router.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json({
      status: "success",
      message: "List of categories",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/categories/:id", async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    res.json({
      status: "success",
      message: "Category details",
      data: category,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
