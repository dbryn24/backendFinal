const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  namaKategori: { type: String, required: true },
  namaProduk: { type: String, required: true },
  hargaProduk: { type: Number, required: true },
  jumlahStok: { type: Number, required: true },
});

module.exports = model("Product", productSchema);
