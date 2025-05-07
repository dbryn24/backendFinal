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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
