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

const findAll = async () => {
  return await User.find();
};

const findById = async (id) => {
  return await User.findById(id);
};

module.exports = {
  getAllItems,
  addItem,
  findAll,
  findById,
};
