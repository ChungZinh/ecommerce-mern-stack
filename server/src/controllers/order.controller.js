const { SuccessResponse } = require("../core/success.response");
const OrderService = require("../services/order.service");

class OrderController {
  static async createOrder(req, res, next) {
    new SuccessResponse({
      message: "Order created successfully",
      data: await OrderService.placeOrder(req),
    }).send(res);
  }

  static async getOrders(req, res, next) {
    new SuccessResponse({
      message: "Orders retrieved successfully",
      data: await OrderService.getOrders(req),
    }).send(res);
  }
}

module.exports = OrderController;
