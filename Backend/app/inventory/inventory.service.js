const Inventory = require("./inventory.model");

const getAllItems = async () => {
  return await Inventory.find();
};

const addItem = async (itemData) => {
  const newItem = new Inventory(itemData);
  return await newItem.save();
};

module.exports = {
  getAllItems,
  addItem,
};
