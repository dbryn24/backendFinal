const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("./category.service");
const mongoose = require("mongoose");

// Middleware untuk validasi MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const id = req.params.id;

  console.log("Validating ObjectId:", id);

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid ObjectId format:", id);
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  next();
};

router.get("/", async (req, res) => {
  try {
    console.log("Fetching categories...");
    const categories = await getAllCategories();
    console.log("Categories found:", categories.length);

    // Set header Content-Type
    res.setHeader("Content-Type", "application/json");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Creating category with data:", req.body);
    const newCategory = await createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", validateObjectId, async (req, res) => {
  try {
    console.log("Updating category with ID:", req.params.id);
    console.log("Update data received:", req.body);

    const updatedCategory = await updateCategory(req.params.id, req.body);

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    console.log("Deleting category with ID:", req.params.id);

    await deleteCategory(req.params.id);

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
