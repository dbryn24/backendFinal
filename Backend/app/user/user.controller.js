const express = require("express");
const router = express.Router();

// User routes
router.get("/", (req, res) => {
  res.json({ message: "User routes working" });
});

router.get("/profile", (req, res) => {
  res.json({ message: "User profile route" });
});

// Make sure to export the router
module.exports = router;
