const Product = require("./product.model");

const findAll = async () => {
  return await Product.find();
};

const findById = async (id) => {
  return await Product.findById(id);
};

module.exports = {
  findAll,
  findById,
};
