const { CreatedResponse } = require("../core/success.response");
const ProductService = require("../services/product.service");
class ProductController {
  static async createProduct(req, res, next) {
    new CreatedResponse({
      message: "Product created successfully",
      data: await ProductService.createProduct(req.body),
    }).send(res);
  }
}

module.exports = ProductController;
