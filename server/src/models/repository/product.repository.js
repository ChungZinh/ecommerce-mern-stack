const Product = require("../product.model");

const findProductById = async (id) => {
  return await Product.findById(id).lean();
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
  await Product.findByIdAndUpdate(productId, { stock: newStock }, { new: true });
};


module.exports = {
  findProductById,
  updateProductStock,
  updateProductStock1
};
