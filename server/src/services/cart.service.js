const {
  NotFoundResponse,
  ForbiddenResponse,
} = require("../core/error.response");
const {
  findUserCart,
  createUserCart,
  createCart,
} = require("../models/repository/cart.repository");
const { findProductById, updateProductStock } = require("../models/repository/product.repository");
const { findUserById } = require("../models/repository/user.repository");
const Product = require("../models/product.model");
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

    // Check the user's cart
    let cart = await findUserCart(userId);
    if (!cart) throw new NotFoundResponse("Cart not found");

    // Find the product in the cart
    const existingProductIndex = cart.products.findIndex(
      (p) => p.productId._id.toString() === productId.toString()
    );
    if (existingProductIndex === -1) throw new NotFoundResponse("Product not found in cart");

    // Get the quantity to be removed
    const quantityToRemove = cart.products[existingProductIndex].quantity;

    // Remove the product from the cart
    cart.products.splice(existingProductIndex, 1);

    // Update the product stock
    await updateProductStock(productId, -quantityToRemove);

    // Recalculate total price
    const productDetailsPromises = cart.products.map(async (p) => {
      const prod = await Product.findById(p.productId).lean();
      return p.quantity * (prod ? prod.prom_price : 0);
    });

    const productPrices = await Promise.all(productDetailsPromises);
    cart.total = productPrices.reduce((acc, price) => acc + price, 0);

    // Update and return the cart
    return await createCart(cart);
  }
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  static async updateProductQuantity(req) {
    if (req.user._id !== req.params.userId)
      throw new ForbiddenResponse(
        "You are not allowed to access this resource"
      );
    const userId = req.user._id || req.params.userId;
    const { productId, quantity } = req.body;

    // Check the user's cart
    let cart = await findUserCart(userId);
    if (!cart) throw new NotFoundResponse("Cart not found");

    // Find the product in the cart
    const existingProduct = cart.products.find(
      (p) => p.productId._id.toString() === productId.toString()
    );
    if (!existingProduct) throw new NotFoundResponse("Product not found in cart");

    // Calculate the quantity change
    const quantityChange = quantity - existingProduct.quantity;

    // Update the product quantity in the cart
    existingProduct.quantity = quantity;

    // Update the product stock
    await updateProductStock(productId, quantityChange);

    // Recalculate total price
    const productDetailsPromises = cart.products.map(async (p) => {
      const prod = await Product.findById(p.productId).lean();
      return p.quantity * (prod ? prod.prom_price : 0);
    });

    const productPrices = await Promise.all(productDetailsPromises);
    cart.total = productPrices.reduce((acc, price) => acc + price, 0);

    // Update and return the cart
    return await createCart(cart);
  }
}

module.exports = CartService;
