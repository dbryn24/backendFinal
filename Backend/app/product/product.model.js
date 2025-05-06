const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    NamaProduct: { type: String, required: true },
    Harga: { type: Number, required: true },
    Stok: { type: Number, required: true },
    CategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "products", // Specify exact collection name
  }
);

module.exports = mongoose.model("Product", productSchema);
