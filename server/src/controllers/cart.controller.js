const { SuccessResponse } = require("../core/success.response");
const CartService = require("../services/cart.service");

class CartController {
  static async addToCart(req, res, next) {
    new SuccessResponse({
      message: "Product added to cart successfully",
      data: await CartService.addToCart(req),
    }).send(res);
  }
}

module.exports = CartController;
