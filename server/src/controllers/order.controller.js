const { SuccessResponse } = require("../core/success.response");
const OrderService = require("../services/order.service");

class OrderController {
  static async createOrder(req, res, next) {
    new SuccessResponse({
      message: "Order created successfully",
      data: await OrderService.placeOrder(req),
    }).send(res);
  }
}

module.exports = OrderController;
