const mongoose = require("mongoose");
const { mongoUrl } = require("../config");

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

module.exports = mongoose;
