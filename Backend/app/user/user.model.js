const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  NamaUser: {
    type: String,
    required: true,
    index: true, // Add index for faster queries
  },
  Role: {
    type: String,
    required: true,
    enum: ["admin", "user", "owner"], // Restrict possible values
    default: "user",
  },
});

// Add compound index for common queries
userSchema.index({ NamaUser: 1, Role: 1 });

const User = mongoose.model("User", userSchema);

// Ensure indexes are created
User.createIndexes();

module.exports = User;
