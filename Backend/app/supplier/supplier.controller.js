//Layer controller untuk handle req dan res
// Validasi body

const express = require("express");
const router = express.Router();
const { getAllSuppliers, getSupplierById } = require("./supplier.service");

router.get("/", async (req, res) => {
  try {
    console.log("Fetching suppliers...");
    const suppliers = await getAllSuppliers();
    console.log("Suppliers found:", suppliers.length, "items:", suppliers);
    res.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const supplier = await getSupplierById(req.params.id);
    res.json(supplier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
