//Layer service adalah layer untuk handle
//Bussiness logic

const { findAll, findById } = require("./supplier.repository");

const getAllSuppliers = async () => {
  const suppliers = await findAll();
  return suppliers;
};

const getSupplierById = async (id) => {
  const supplier = await findById(id);
  if (!supplier) {
    throw new Error("Supplier tidak ditemukan");
  }
  return supplier;
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
};
