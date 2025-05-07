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
  return await Product.findByIdAndUpdate(id, productData, { new: true })
    .lean()
    .exec();
};

module.exports = {
  findAll,
  findById,
  create,
  update,
};
