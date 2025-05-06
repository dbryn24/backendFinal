const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//Buat Model
const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
