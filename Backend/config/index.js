const dotenv = require("dotenv");
const path = require("path");

// Load .env file from the Backend directory
dotenv.config({ path: path.join(__dirname, "../.env") });

// Add validation for required environment variables
if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is required in environment variables");
}

module.exports = {
  mongoUrl: process.env.MONGO_URL,
};
