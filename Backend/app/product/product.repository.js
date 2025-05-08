// File: app/product/product.repository.js
const Product = require("./product.model");

const findAll = async () => {
  return await Product.find().lean().exec();
};

const findById = async (id) => {
  return await Product.findById(id).lean().exec();
};

const create = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

const update = async (id, productData) => {
  console.log("Repository updating product:", id, productData);
  try {
    const result = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true, // Add this to ensure validation runs on update
    })
      .lean()
      .exec();

    console.log("Update result:", result);
    return result;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Re-throw to be handled by service
  }
};

const remove = async (id) => {
  return await Product.findByIdAndDelete(id).lean().exec();
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
