const {
  NotFoundResponse,
  ForbiddenResponse,
} = require("../core/error.response");
const {
  findUserCart,
  createUserCart,
  createCart,
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

  static async getUserCart(req) {
    if (req.user._id !== req.params.userId)
      throw new ForbiddenResponse(
        "You are not allowed to access this resource"
      );
    const userId = req.user._id || req.params.userId;

    // Kiểm tra người dùng
    const user = await findUserById(userId);
    if (!user) throw new NotFoundResponse("User not found");

    // Lấy giỏ hàng của người dùng
    const cart = await findUserCart(userId);
    if (!cart) throw new NotFoundResponse("Cart not found");

    return cart;
  }

  static async removeProductFromCart(req) {
    if (req.user._id !== req.params.userId)
      throw new ForbiddenResponse(
        "You are not allowed to access this resource"
      );
    const userId = req.user._id || req.params.userId;

    const { productId } = req.params;
    console.log("productId", productId);
    // Kiểm tra giỏ hàng của người dùng
    const cart = await findUserCart(userId);
    if (!cart) throw new NotFoundResponse("Cart not found");

    // Kiểm tra sản phẩm trong giỏ hàng
    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );
    if (!existingProduct)
      throw new NotFoundResponse("Product not found in cart");

    // Xóa sản phẩm khỏi giỏ hàng
    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    console.log("cart.products", cart.products);

    // Cập nhật giỏ hàng
    const updatedCart = await createCart(cart);

    return updatedCart;
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  static async updateProductQuantity(req) {
    if (req.user._id !== req.params.userId)
      throw new ForbiddenResponse(
        "You are not allowed to access this resource"
      );
    const userId = req.user._id || req.params.userId;
    const { productId, quantity } = req.body;

    // Kiểm tra giỏ hàng của người dùng
    const cart = await findUserCart(userId);
    if (!cart) throw new NotFoundResponse("Cart not found");

    // Kiểm tra sản phẩm trong giỏ hàng
    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );
    if (!existingProduct)
      throw new NotFoundResponse("Product not found in cart");

    // Cập nhật số lượng sản phẩm
    existingProduct.quantity = quantity;

    // Cập nhật giỏ hàng
    const updatedCart = await createCart(cart);

    return updatedCart;
  }
}

module.exports = CartService;
