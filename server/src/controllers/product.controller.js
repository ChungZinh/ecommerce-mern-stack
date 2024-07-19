const { CreatedResponse } = require("../core/success.response");
const ProductService = require("../services/product.service");
class ProductController {
  static async createProduct(req, res, next) {
    new CreatedResponse({
      message: "Product created successfully",
      data: await ProductService.createProduct(req.body),
    }).send(res);
  }

  static async getProductsList(req, res, next) {
    new CreatedResponse({
      message: "Products list",
      data: await ProductService.getProductsList(req),
    }).send(res);
  }

  static async deleteProduct(req, res, next) {
    new CreatedResponse({
      message: "Product deleted successfully",
      data: await ProductService.deleteProduct(req),
    }).send(res);
  }
}

module.exports = ProductController;
