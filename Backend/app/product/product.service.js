// File: app/product/product.service.js
const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("./product.repository");
const Product = require("./product.model");

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
  console.log("Product data received:", productData);

  // Check required fields
  if (
    !productData.NamaProduct ||
    !productData.Harga ||
    !productData.Stok ||
    !productData.CategoryId
  ) {
    throw new Error("NamaProduct, Harga, Stok, and CategoryId are required");
  }

  const newProduct = await create(productData);
  return newProduct;
};

const updateProduct = async (id, productData) => {
  console.log("Updating product with data:", productData);

  // Check required fields
  if (
    !productData.NamaProduct ||
    !productData.Harga ||
    productData.Stok === undefined // Modified to check undefined instead of falsy
  ) {
    throw new Error("NamaProduct, Harga, and Stok are required");
  }

  // Ensure numeric fields are numbers
  const updatedData = {
    ...productData,
    Harga:
      typeof productData.Harga === "string"
        ? parseInt(productData.Harga)
        : productData.Harga,
    Stok:
      typeof productData.Stok === "string"
        ? parseInt(productData.Stok)
        : productData.Stok,
  };

  // Explicitly ensure NamaSupplier is included in the update
  if (productData.NamaSupplier !== undefined) {
    updatedData.NamaSupplier = productData.NamaSupplier;
  } else if (productData.supplier !== undefined) {
    // Handle case where frontend sends 'supplier' instead of 'NamaSupplier'
    updatedData.NamaSupplier = productData.supplier;
  }

  console.log("Final update data:", updatedData);

  const updatedProduct = await update(id, updatedData);
  if (!updatedProduct) {
    throw new Error("Product tidak ditemukan");
  }

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const product = await remove(id);
  if (!product) {
    throw new Error("Product tidak ditemukan");
  }
  return product;
};

const updateStock = async (id, action) => {
  const product = await findById(id);
  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  if (action === "increase") {
    product.Stok += 1;
  } else if (action === "decrease" && product.Stok > 0) {
    product.Stok -= 1;
  }

  return await update(id, product);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
};
