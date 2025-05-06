//Layer controller untuk handle req dan res
// Validasi body

const express = require("express");
const router = express.Router();
const { getAllItems, addItem } = require("./inventory.service");

router.get("/inventory", async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/inventory", async (req, res) => {
  try {
    const newItem = await addItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
