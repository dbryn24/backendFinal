const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById } = require("./product.service");

router.get("/", async (req, res) => {
  try {
    console.log("Fetching products...");
    const products = await getAllProducts();
    console.log("Products found:", products.length, "items:", products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
