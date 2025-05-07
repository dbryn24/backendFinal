//Layer service adalah layer untuk handle
//Bussiness logic
const User = require("./user.model");
const { findAll, findById, create, remove } = require("./user.repository");

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

const createUser = async (userData) => {
  const user = await create(userData);
  return user;
};

const deleteUser = async (id) => {
  console.log("Service: Deleting user with ID:", id);
  const user = await remove(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
