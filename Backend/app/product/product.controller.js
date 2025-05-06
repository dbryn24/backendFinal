const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById } = require("./product.service");

router.get("/products", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json({
      status: "success",
      message: "List of products",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json({ status: "success", message: "Product details", data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
