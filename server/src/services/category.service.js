const Category = require("../models/category.model");

class CategoryService {
  static async create({ name, slug, description, parentCategory, subCategories }) {
    // Create a new category
    const category = Category.create({
      name,
      slug,
      description,
      parentCategory,
      subCategories
    });

    return category;
  }
}

module.exports = CategoryService;
