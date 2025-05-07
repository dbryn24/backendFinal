const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    NamaProduk: { type: String, required: true },
    NamaSupplier: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "supplier",
  }
);

module.exports = mongoose.model("Supplier", supplierSchema);
