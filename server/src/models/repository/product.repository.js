const Product = require("../product.model");

const findProductById = async (id) => {
  return await Product.findById(id).lean();
};

module.exports = {
  findProductById,
};
