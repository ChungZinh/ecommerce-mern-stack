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

  static async moveToDraft(req, res, next) {
    new CreatedResponse({
      message: "Product deleted successfully",
      data: await ProductService.moveToDraft(req),
    }).send(res);
  }

  static async publishProduct(req, res, next) {
    new CreatedResponse({
      message: "Product published successfully",
      data: await ProductService.publishProduct(req),
    }).send(res);
  }

  static async updateProduct(req, res, next) {
    new CreatedResponse({
      message: "Product updated successfully",
      data: await ProductService.updateProduct(req),
    }).send(res);
  }

  static async getTopSelling(req, res, next) {
    new CreatedResponse({
      message: "Top selling products",
      data: await ProductService.addTopSellingProduct(),
    }).send(res);
  }

  static async addTopSelling(req, res, next) {
    new CreatedResponse({
      message: "Product added to top selling",
      data: await ProductService.addTopSellingProduct(req.body),
    }).send(res);
  }
}

module.exports = ProductController;
