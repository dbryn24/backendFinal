//Layer repository berfungsi untuk komunikasi dengan
// database boleh ODM boleh juga pakai raw query

const Inventory = require("../inventory/inventory.model"); // Model untuk inventaris
const User = require("./user.model");

const getAllItems = async () => {
  return await Inventory.find();
};

const addItem = async (item) => {
  const newItem = new Inventory(item);
  return await newItem.save();
};

// User repository functions
const findAll = async () => {
  return await User.find().lean().exec();
};

const findById = async (id) => {
  return await User.findById(id).lean().exec();
};

const create = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const remove = async (id) => {
  return await User.findByIdAndDelete(id).lean().exec();
};

module.exports = {
  getAllItems,
  addItem,
  findAll,
  findById,
  create,
  remove,
};
