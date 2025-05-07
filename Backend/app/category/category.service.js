const { findAll, findById } = require("./category.repository");

const getAllCategories = async () => {
  const categories = await findAll();
  return categories;
};

const getCategoryById = async (id) => {
  const category = await findById(id);
  if (!category) {
    throw new Error("Category tidak ditemukan");
  }
  return category;
};

module.exports = {
  getAllCategories,
  getCategoryById,
};
