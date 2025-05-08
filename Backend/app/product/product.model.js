// File: app/product/product.model.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    NamaProduct: {
      type: String,
      required: [true, "NamaProduct is required"],
    },
    Harga: {
      type: Number,
      required: [true, "Harga is required"],
    },
    Stok: {
      type: Number,
      required: [true, "Stok is required"],
    },
    CategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "CategoryId is required"],
    },
    NamaSupplier: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "products",
  }
);

module.exports = mongoose.model("Product", productSchema);
