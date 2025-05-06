//Layer service adalah layer untuk handle
//Bussiness logic
const User = require("./user.model");

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
};
