const User = require("../user.model");
const findUserByEmail = async (email) => {
  return await User.findOne({ email }).lean();
};
const findUserByMobile = async (mobile) => {
  return await User.findOne({ mobile }).lean();
};

const findUserById = async (id) => {
  return await User.findById(id).lean();
};

module.exports = {
  findUserByEmail,
  findUserByMobile,
  findUserById,
};
