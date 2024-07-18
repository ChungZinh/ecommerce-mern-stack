const { SuccessResponse } = require("../core/success.response");
const CategoryService = require("../services/category.service");

class CategoryController {
  static async create(req, res, next) {
    new SuccessResponse({
      message: "Category created successfully",
      data: await CategoryService.create(req.body),
    }).send(res);
  }
}

module.exports = CategoryController;
