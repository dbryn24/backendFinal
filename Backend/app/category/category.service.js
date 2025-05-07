const { findAll, findById, create } = require("./category.repository");

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

const createCategory = async (categoryData) => {
  if (!categoryData.NamaKategori) {
    throw new Error("NamaKategori is required");
  }
  return await create(categoryData);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
};
