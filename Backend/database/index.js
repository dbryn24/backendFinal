const mongoose = require("mongoose");
const { mongoUrl } = require("../config");

if (!mongoUrl) {
  console.error("MongoDB connection URL is not defined!");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB...");

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
