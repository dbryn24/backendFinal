const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  namaKategori: { type: String, required: true },
});

module.exports = model("Category", categorySchema);
