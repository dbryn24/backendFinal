const { findAll, findById } = require("./product.repository");

const getAllProducts = async () => {
  return await findAll();
};

const getProductById = async (id) => {
  const product = await findById(id);
  if (!product) {
    throw new Error("Product tidak ditemukan");
  }
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
