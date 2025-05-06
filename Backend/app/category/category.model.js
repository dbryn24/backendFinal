const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    NamaKategori: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "category", // Specify exact collection name
  }
);

module.exports = mongoose.model("Category", categorySchema);
