const Product = require("./product.model");

const findAll = async () => {
  return await Product.find().populate("CategoryId", "NamaKategori");
};

const findById = async (id) => {
  return await Product.findById(id).populate("CategoryId", "NamaKategori");
};

module.exports = {
  findAll,
  findById,
};
