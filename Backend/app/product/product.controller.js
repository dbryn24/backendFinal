// File: app/product/product.controller.js
const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} = require("./product.service");

// GET route to fetch all products
router.get("/", async (req, res) => {
  try {
    console.log("Fetching products...");
    const products = await getAllProducts();
    console.log("Products found:", products.length);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch a product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(404).json({ message: error.message });
  }
});

// POST route to create a new product
router.post("/", async (req, res) => {
  try {
    console.log("Creating product with data:", req.body);
    const newProduct = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
});

// PUT route to update a product by ID
router.put("/:id", async (req, res) => {
  try {
    console.log("Updating product with ID:", req.params.id);
    console.log("Update data received:", req.body);

    // Transform supplier field if needed
    if (
      req.body.supplier !== undefined &&
      req.body.NamaSupplier === undefined
    ) {
      req.body.NamaSupplier = req.body.supplier;
    }

    const updatedProduct = await updateProduct(req.params.id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE route to delete a product
router.delete("/:id", async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update stock
router.put("/:id/stock", async (req, res) => {
  try {
    const { action } = req.body;
    const product = await updateStock(req.params.id, action);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
