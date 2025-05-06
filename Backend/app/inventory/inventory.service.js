const Inventory = require("./inventory.model"); // Model untuk inventaris

// Mendapatkan semua item inventaris
const getAllItems = async () => {
  // TODO: Implement database query
  return [];
};

// Menambahkan item baru ke inventaris
const addItem = async (itemData) => {
  // TODO: Implement database insert
  return itemData;
};

module.exports = {
  getAllItems,
  addItem,
};
