const Inventory = require("./inventory.model");

const getAllItems = async () => {
  return await Inventory.find();
};

const addItem = async (item) => {
  const newItem = new Inventory(item);
  return await newItem.save();
};

module.exports = {
  getAllItems,
  addItem,
};
