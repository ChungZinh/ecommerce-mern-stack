const { NotFoundResponse } = require("../core/error.response");
const {
  findUserCart,
  createUserCart,
} = require("../models/repository/cart.repository");
const { findProductById } = require("../models/repository/product.repository");
const { findUserById } = require("../models/repository/user.repository");

class CartService {
  static async addToCart(req) {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    // Kiểm tra người dùng
    const user = await findUserById(userId);
    if (!user) throw new NotFoundResponse("User not found");

    // Kiểm tra sản phẩm
    const product = await findProductById(productId);
    if (!product) throw new NotFoundResponse("Product not found");

    // Tạo hoặc cập nhật giỏ hàng của người dùng
    const cart = await createUserCart({
      userId,
      product: { productId, quantity },
    });

    return cart;
  }
}

module.exports = CartService;
