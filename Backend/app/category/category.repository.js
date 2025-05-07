const Category = require("./category.model");

const findAll = async () => {
  return await Category.find();
};

const findById = async (id) => {
  return await Category.findById(id);
};

const create = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

module.exports = {
  findAll,
  findById,
  create,
};
