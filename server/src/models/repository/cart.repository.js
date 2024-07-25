const { NotFoundResponse } = require("../../core/error.response");
const Cart = require("../cart.model");
const Product = require("../product.model");
const { updateProductStock1 } = require("./product.repository");
const findUserCart = async (userId) => {
  return await Cart.findOne({ userId }).populate("products.productId").lean();
};

const createUserCart = async ({ userId, product = {} }) => {
  const cart = await findUserCart(userId);

  // Fetch product details
  const productDetails = await Product.findById(product.productId).lean();

  if (!productDetails) {
    throw new NotFoundResponse("Product not found");
  }

  if (cart) {
    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa

    console.log("cart", cart);

    const existingProduct = cart.products.find(
      (p) => p.productId._id.toString() === product.productId
    );

    if (existingProduct) {
      // Update quantity if product already exists
      existingProduct.quantity += product.quantity;
      await updateProductStock1(
        product.productId,
        productDetails.stock - product.quantity
      );
    } else {
      // Add new product to cart
      cart.products.push({
        productId: product.productId,
        quantity: product.quantity,
      });

      await updateProductStock1(
        product.productId,
        productDetails.stock - product.quantity
      );
    }

    // Calculate total price
    // Use Promise.all to wait for all async operations to complete
    const productDetailsPromises = cart.products.map(async (p) => {
      const prod = await Product.findById(p.productId).lean();
      return p.quantity * (prod ? prod.prom_price : 0);
    });

    // Wait for all promises to resolve
    const productPrices = await Promise.all(productDetailsPromises);

    // Sum up the total price
    const totalPrice = productPrices.reduce((acc, price) => acc + price, 0);

    // Update cart with new total price
    cart.total = totalPrice;

    // Save the updated cart and return it with populated product details
    return await Cart.findByIdAndUpdate(
      cart._id,
      { $set: { products: cart.products, total: cart.total } },
      { new: true }
    )
      .populate("products.productId")
      .lean();
  } else {
    const newCart = new Cart({
      userId: userId,
      products: [{ productId: product.productId, quantity: product.quantity }],
      total: productDetails.prom_price * product.quantity,
      status: "ACTIVE",
    });

    await updateProductStock1(
      product.productId,
      productDetails.stock - product.quantity
    );
    return await newCart
      .save()
      .then((cart) =>
        Cart.findById(cart._id).populate("products.productId").lean()
      );
  }
};
// Tìm giỏ hàng theo ID
const findCartById = async (id) => {
  return await Cart.findById(id).populate("products.productId").lean();
};

// Tạo mới giỏ hàng
const createCart = async (cart) => {
  // Fetch product details

  return await Cart.findByIdAndUpdate(cart._id, cart, { new: true })
    .populate("products.productId")
    .lean();
};

module.exports = {
  findUserCart,
  createCart,
  findCartById,
  createUserCart,
};
