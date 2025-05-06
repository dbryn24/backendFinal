const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    NameUser: { type: String, required: true },
    Role: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);
