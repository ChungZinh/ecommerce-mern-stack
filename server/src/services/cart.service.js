const { NotFoundResponse } = require("../core/error.response");
const { findUserById } = require("../models/repository/user.repository");
const Cart = require("../models/cart.model");
const { findProductById } = require("../models/repository/product.repository");
class CartService {
  static async getCart(req) {
    const user = await findUserById(req.user._id || req.params.userId);

    if (!user) throw new NotFoundResponse("User not found");

    console.log("user", user);
    const cart = await Cart.findOne({
      userId: user._id,
      status: "ACTIVE",
    }).populate("items.productId");

    console.log(cart);

    return cart;
  }

  static async addItemToCart(req) {
    // Check if the user exists
    const user = await findUserById(req.user._id);
    if (!user) throw new NotFoundResponse("User not found");

    const { productId, quantity } = req.body;

    // Check if the quantity is a positive number
    if (isNaN(quantity) || quantity <= 0) {
      throw new Error("Quantity must be a positive number");
    }

    // Check if the product exists
    const product = await findProductById(productId);
    if (!product) throw new NotFoundResponse("Product not found");

    // Check if there's enough stock
    if (product.stock < quantity) {
      throw new Error("Not enough stock available");
    }

    let cart = await Cart.findOne({
      userId: user._id,
      status: "ACTIVE",
    });

    if (!cart) {
      cart = new Cart({
        userId: user._id,
        items: [
          {
            productId: product._id,
            quantity,
          },
        ],
        total: 0,
        status: "ACTIVE",
      });
    } else {
      const item = cart.items.find((item) =>
        item.productId.equals(product._id)
      );

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({
          productId: product._id,
          quantity,
        });
      }
    }

    // Update the product stock
    product.stock -= quantity;
    await product.save();

    await cart.save();

    return cart;
  }

  static async updateCart(req) {
    const user = await findUserById(req.user._id);
    if (!user) throw new NotFoundResponse("User not found");

    const { productId, quantity } = req.body;

    if (isNaN(quantity) || quantity < 0) {
      throw new Error("Quantity must be a non-negative number");
    }

    const product = await findProductById(productId);
    if (!product) throw new NotFoundResponse("Product not found");

    let cart = await Cart.findOne({
      userId: user._id,
      status: "ACTIVE",
    });

    if (!cart) {
      throw new NotFoundResponse("Cart not found");
    }

    const item = cart.items.find((item) => item.productId.equals(product._id));
    if (!item) {
      throw new NotFoundResponse("Item not found in cart");
    }

    const originalQuantity = item.quantity;

    if (quantity === 0) {
      // Remove the item if quantity is set to 0
      cart.items = cart.items.filter(
        (item) => !item.productId.equals(product._id)
      );
    } else {
      // Update the quantity
      item.quantity = quantity;
    }

    // Adjust the stock
    const quantityDifference = originalQuantity - quantity;
    product.stock += quantityDifference;
    await product.save();

    await cart.save();

    return cart;
  }

  static async removeItemFromCart(req) {
    const user = await findUserById(req.user._id);
    if (!user) throw new NotFoundResponse("User not found");
  
    const { productId } = req.params;
  
    if (!productId) {
      throw new Error("Product ID is required");
    }
  
    const product = await findProductById(productId);
    if (!product) throw new NotFoundResponse("Product not found");
  
    let cart = await Cart.findOne({
      userId: user._id,
      status: "ACTIVE",
    });
  
    if (!cart) {
      throw new NotFoundResponse("Cart not found");
    }
  
    const itemIndex = cart.items.findIndex((item) => item.productId.equals(product._id));
    if (itemIndex === -1) {
      throw new NotFoundResponse("Item not found in cart");
    }
  
    // Get the quantity of the item to adjust the stock
    const quantity = cart.items[itemIndex].quantity;
  
    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);
  
    // Update the product stock
    product.stock += quantity;
    await product.save();
  
    // Save the updated cart
    await cart.save();
  
    return cart;
  }

  static async removeCart(req) {
    
    const user = await findUserById(req.user._id || req.params.userId);
    if (!user) throw new NotFoundResponse("User not found");
  
    let cart = await Cart.findOne({
      userId: user._id,
      status: "ACTIVE",
    });
  
    if (!cart) {
      throw new NotFoundResponse("Cart not found");
    }
  
    // Update product stock for each item in the cart
    for (const item of cart.items) {
      const product = await findProductById(item.productId);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
  
    // Remove the cart
    await Cart.deleteOne({
      userId: user._id,
      status: "ACTIVE",
    });
  
    return { message: "Cart successfully removed" };
  }
  
  
}

module.exports = CartService;
