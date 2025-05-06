const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById } = require("./user.service");

// Base route handler for GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
