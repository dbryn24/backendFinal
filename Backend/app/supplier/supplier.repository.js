//Layer repository berfungsi untuk komunikasi dengan
// database boleh ODM boleh juga pakai raw query

const Supplier = require("./supplier.model");

const findAll = async () => {
  return await Supplier.find();
};

const findById = async (id) => {
  return await Supplier.findById(id);
};

module.exports = {
  findAll,
  findById,
};
