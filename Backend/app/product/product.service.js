const { findAll, findById, create, update } = require("./product.repository");

const getAllProducts = async () => {
  const products = await findAll();
  return products;
};

const getProductById = async (id) => {
  const product = await findById(id);
  if (!product) {
    throw new Error("Product tidak ditemukan");
  }
  return product;
};

const createProduct = async (productData) => {
  if (
    !productData.NamaProduct || // Match the database field name
    !productData.Harga || // Match the database field name
    !productData.Stok || // Match the database field name
    !productData.CategoryId // Match the database field name
  ) {
    throw new Error("NamaProduct, Harga, Stok, and CategoryId are required");
  }

  const newProduct = await create(productData);
  return newProduct;
};

const updateProduct = async (id, productData) => {
  if (
    !productData.NamaProduct || // Match the database field name
    !productData.Harga || // Match the database field name
    !productData.Stok // Match the database field name
  ) {
    throw new Error("NamaProduct, Harga, and Stok are required");
  }

  const updatedProduct = await update(id, productData);
  if (!updatedProduct) {
    throw new Error("Product tidak ditemukan");
  }

  return updatedProduct;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
