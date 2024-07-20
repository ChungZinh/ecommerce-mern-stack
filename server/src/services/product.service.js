const { NotFoundResponse } = require("../core/error.response");
const Product = require("../models/product.model");
const { create } = require("./category.service");
class ProductService {
  static async createProduct(data) {
    return await Product.create({
      ...data,
      slug: data.name.toLowerCase().split(" ").join("-"),
      specifications: {
        weight: data.weight,
        dimensions: {
          width: data.width,
          height: data.height,
        },
      },
    });
  }

  static async getProductsList(req) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const products = await Product.find({
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.productId && { _id: req.query.productId }),
      ...(req.query.isDraft && { isDraft: req.query.isDraft }),
      ...(req.query.isPublished && { isPublished: req.query.isPublished }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .populate("category", "name")
      .sort({ createdAt: sortDirection })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalProducts = await Product.countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);

    const timeNow = new Date();

    const oneMonthAgo = new Date(
      timeNow.getFullYear(),
      timeNow.getMonth() - 1,
      timeNow.getDate()
    );

    const lastMonthPosts = await Product.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return {
      products,
      totalPages,
      totalProducts,
      lastMonthPosts,
    };
  }

  static async moveToDraft(req) {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundResponse("Product not found");
    }

    return await Product.findByIdAndUpdate(
      req.params.id,
      {
        isDraft: true,
        isPublished: false,
      },
      { new: true }
    );
  }

  static async publishProduct(req) {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundResponse("Product not found");
    }

    return await Product.findByIdAndUpdate(
      req.params.id,
      {
        isDraft: false,
        isPublished: true,
      },
      { new: true }
    );
  }

  static async updateProduct(req) {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundResponse("Product not found");
    }

    return await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        slug: req.body.name.toLowerCase().split(" ").join("-"),
      },
      { new: true }
    );
  }
}

module.exports = ProductService;
