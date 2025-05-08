const {
  findAll,
  findById,
  create,
  update,
  remove,
  checkCategoryInUse,
} = require("./category.repository");
const mongoose = require("mongoose");

const getAllCategories = async () => {
  try {
    const categories = await findAll();
    return categories;
  } catch (error) {
    console.error("Error in getAllCategories service:", error);
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    // Validasi format ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category ID format");
    }

    const category = await findById(id);
    if (!category) {
      throw new Error("Category tidak ditemukan");
    }
    return category;
  } catch (error) {
    console.error("Error in getCategoryById service:", error);
    throw error;
  }
};

const createCategory = async (categoryData) => {
  try {
    if (!categoryData.NamaKategori) {
      throw new Error("NamaKategori is required");
    }

    // Pastikan description tidak undefined
    if (categoryData.description === undefined) {
      categoryData.description = "";
    }

    return await create(categoryData);
  } catch (error) {
    console.error("Error in createCategory service:", error);
    throw error;
  }
};

const updateCategory = async (id, categoryData) => {
  try {
    // Validasi format ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category ID format");
    }

    if (!categoryData.NamaKategori) {
      throw new Error("NamaKategori is required");
    }

    // Pastikan description tidak undefined
    if (categoryData.description === undefined) {
      categoryData.description = "";
    }

    console.log("Updating category with data:", categoryData);

    const category = await update(id, categoryData);

    if (!category) {
      throw new Error("Category tidak ditemukan");
    }

    return category;
  } catch (error) {
    console.error("Error in updateCategory service:", error);
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    // Validasi format ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category ID format");
    }

    const isInUse = await checkCategoryInUse(id);

    if (isInUse) {
      throw new Error(
        "Cannot delete category because it is still being used by one or more products"
      );
    }

    const category = await remove(id);

    if (!category) {
      throw new Error("Category tidak ditemukan");
    }

    return category;
  } catch (error) {
    console.error("Error in deleteCategory service:", error);
    throw error;
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
