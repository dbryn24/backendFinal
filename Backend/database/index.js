const mongoose = require("mongoose");
const { mongoUrl } = require("../config");

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    console.log("Database URL:", mongoUrl);
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

module.exports = mongoose;
