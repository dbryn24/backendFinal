const Category = require("./category.model");

const findAll = async () => {
  return await Category.find();
};

const findById = async (id) => {
  return await Category.findById(id);
};

module.exports = {
  findAll,
  findById,
};
