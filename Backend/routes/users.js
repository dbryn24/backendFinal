const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Product routes
router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);
router.put("/products/:id/stock", productController.updateStock);

module.exports = router;
