const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    NamaKategori: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "category",
  }
);

module.exports = mongoose.model("Category", categorySchema);
