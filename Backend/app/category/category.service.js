const { findAll, findById } = require("./category.repository");

const getAllCategories = async () => {
  return await findAll();
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
