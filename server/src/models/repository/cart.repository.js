const Cart = require("../cart.model");

const findUserCart = async (userId) => {
  return await Cart.findOne({ userId }).lean();
};

const createUserCart = async ({ userId, product = {} }) => {
  const cart = await findUserCart(userId);

  if (cart) {
    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === product.productId
    );

    if (existingProduct) {
      // Cập nhật số lượng sản phẩm nếu đã tồn tại
      existingProduct.quantity += product.quantity;

      // Cập nhật giỏ hàng
      return await Cart.findByIdAndUpdate(
        cart._id,
        { $set: { products: cart.products } },
        { new: true }
      ).lean();
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      cart.products.push({
        productId: product.productId,
        quantity: product.quantity,
      });

      // Cập nhật giỏ hàng
      return await Cart.findByIdAndUpdate(
        cart._id,
        { $set: { products: cart.products } },
        { new: true }
      ).lean();
    }
  } else {
    // Tạo mới giỏ hàng nếu chưa tồn tại
    const newCart = new Cart({
      userId: userId,
      products: [{ productId: product.productId, quantity: product.quantity }],
      total: 0, // Giá trị ban đầu, sẽ được tính lại trong pre-save hook
      status: "ACTIVE",
    });

    return await newCart.save();
  }
};
// Tìm giỏ hàng theo ID
const findCartById = async (id) => {
  return await Cart.findById(id).lean();
};

// Tạo mới giỏ hàng
const createCart = async (cart) => {
  return await Cart.findByIdAndUpdate(cart._id, cart, { new: true }).lean();
};

module.exports = {
  findUserCart,
  createCart,
  findCartById,
  createUserCart,
};
