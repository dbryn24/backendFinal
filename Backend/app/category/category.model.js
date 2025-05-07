const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    NamaKategori: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      default: "", // Menggunakan default kosong, bukan null
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "category",
  }
);

module.exports = mongoose.model("Category", categorySchema);
