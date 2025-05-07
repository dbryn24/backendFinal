const Category = require("./category.model");
const Product = require("../product/product.model");
const mongoose = require("mongoose");

const findAll = async () => {
  return await Category.find();
};

const findById = async (id) => {
  try {
    // Validasi format ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category ID format");
    }
    return await Category.findById(id);
  } catch (error) {
    console.error("Error in findById:", error);
    throw error;
  }
};

const create = async (categoryData) => {
  try {
    console.log("Creating category with data:", categoryData);
    const category = new Category(categoryData);
    return await category.save();
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

const update = async (id, categoryData) => {
  try {
    console.log("Updating category, ID:", id, "Data:", categoryData);

    // Validasi format ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category ID format");
    }

    return await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    console.log("Removing category with ID:", id);

    // Validasi format ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category ID format");
    }

    return await Category.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error removing category:", error);
    throw error;
  }
};

const checkCategoryInUse = async (categoryId) => {
  try {
    console.log("Checking if category is in use, ID:", categoryId);

    // Validasi format ID
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error("Invalid category ID format");
    }

    // Contoh query untuk mencari kategori di Product
    const productCount = await Product.countDocuments({
      CategoryId: categoryId,
    });

    console.log(`Found ${productCount} products using category ${categoryId}`);
    return productCount > 0;
  } catch (error) {
    console.error("Error checking if category is in use:", error);
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  checkCategoryInUse,
};
