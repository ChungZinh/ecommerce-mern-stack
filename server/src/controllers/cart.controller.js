const { SuccessResponse } = require("../core/success.response");
const CartService = require("../services/cart.service");

class CartController {
  static async addToCart(req, res, next) {
    new SuccessResponse({
      message: "Product added to cart successfully",
      data: await CartService.addToCart(req),
    }).send(res);
  }

  static async getUserCart(req, res, next) {
    new SuccessResponse({
      message: "User cart retrieved successfully",
      data: await CartService.getUserCart(req),
    }).send(res);
  }

  static async updateCart(req, res, next) {
    new SuccessResponse({
      message: "Cart updated successfully",
      data: await CartService.updateProductQuantity(req),
    }).send(res);
  }

  static async removeProductFromCart(req, res, next) {
    new SuccessResponse({
      message: "Product removed from cart successfully",
      data: await CartService.removeProductFromCart(req),
    }).send(res);
  }
}

module.exports = CartController;
