const Category = require("../models/category.model");

class CategoryService {
  static async create({
    name,
    slug,
    description,
    parentCategory,
    subCategories,
  }) {
    // Create a new category
    const category = Category.create({
      name,
      slug,
      description,
      parentCategory,
      subCategories,
    });

    return category;
  }

  static async getList() {
    // Get all categories have subCategories not empty
    const categories = await Category.find({
      subCategories: { $exists: true, $not: { $size: 0 } }, // check if subCategories is not empty
    }).populate("subCategories", "name"); // get only name of subCategories

    return categories;
  }

  static async getAllSubCategories() {
    // Get all subCategories

    return await Category.find({}).select('name');
  }

}

module.exports = CategoryService;
