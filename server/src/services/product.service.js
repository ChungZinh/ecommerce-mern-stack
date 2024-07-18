class ProductService {
  static async createProduct(data) {
    return await Product.create({
      ...data,
      slug: data.name.toLowerCase().split(" ").join("-"),
    });
  }
}
