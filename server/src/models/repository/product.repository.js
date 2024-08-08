const Product = require("../product.model");
const mongoose = require("mongoose");
const findProductById = async (productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return null;
  }
  return await Product.findById(productId);
};
const updateProductStock1 = async (productId, newStock) => {
  return await Product.findByIdAndUpdate(
    productId,
    { stock: newStock },
    { new: true }
  );
};

const updateProductStock = async (productId, quantityChange) => {
  // Find the product
  const product = await Product.findById(productId).lean();
  if (!product) throw new Error("Product not found");

  // Calculate the new stock
  const newStock = product.stock - quantityChange;

  // Update the product stock
  await Product.findByIdAndUpdate(
    productId,
    { stock: newStock },
    { new: true }
  );
};

module.exports = {
  findProductById,
  updateProductStock,
  updateProductStock1,
};
