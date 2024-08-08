const { SuccessResponse } = require("../core/success.response");
const CartService = require("../services/cart.service");

class CartController {
  static async addToCart(req, res, next) {
    new SuccessResponse({
      message: "Product added to cart successfully",
      data: await CartService.addItemToCart(req),
    }).send(res);
  }

  static async getUserCart(req, res, next) {
    new SuccessResponse({
      message: "User cart retrieved successfully",
      data: await CartService.getCart(req),
    }).send(res);
  }

  static async updateCart(req, res, next) {
    new SuccessResponse({
      message: "Cart updated successfully",
      data: await CartService.updateCart(req),
    }).send(res);
  }

  static async removeProductFromCart(req, res, next) {
    new SuccessResponse({
      message: "Product removed from cart successfully",
      data: await CartService.removeItemFromCart(req),
    }).send(res);
  }

  static async removeCart(req, res, next) {
    new SuccessResponse({
      message: "Cart removed successfully",
      data: await CartService.removeCart(req),
    }).send(res);
  }
}

module.exports = CartController;
