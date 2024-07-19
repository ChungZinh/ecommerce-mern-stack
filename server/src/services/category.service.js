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

  // static async getList() {
  //   // Get all categories have subCategories not empty
  //   const categories = await Category.find({
  //     subCategories: { $exists: true, $not: { $size: 0 } }, // check if subCategories is not empty
  //   }).populate("subCategories", "name"); // get only name of subCategories

  //   return categories;
  // }

  static async getList(req) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const categories = await Category.find({
      ...(req.query.parentCategory && {
        parentCategory: req.query.parentCategory,
      }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.categoryId && { _id: req.query.categoryId }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .populate("subCategories", "name")
      .sort({ createdAt: sortDirection })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCategories = await Category.countDocuments();

    const totalPages = Math.ceil(totalCategories / limit);

    const timeNow = new Date();

    const oneMonthAgo = new Date(
      timeNow.getFullYear(),
      timeNow.getMonth() - 1,
      timeNow.getDate()
    );

    const lastMonthPosts = await Category.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return {
      categories,
      totalPages,
      totalCategories,
      lastMonthPosts,
    };
  }
}

module.exports = CategoryService;
