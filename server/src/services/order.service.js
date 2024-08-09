const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const { NotFoundResponse } = require("../core/error.response");
const { transporter } = require("../utils/sendMail");
const { generateOrderBillHTML } = require("../utils/generateOrderBillHtml");

class OrderService {
  static async placeOrder(req) {
    // Check if cart exists
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      throw new NotFoundResponse("Cart not found");
    }

    // Check if cart is empty
    if (cart.items.length === 0) {
      throw new NotFoundResponse("Cart is empty");
    }

    const { address, city, country, orderNote, paymentMethod, totalPrice } =
      req.body;

    // check total price
    if (parseFloat(totalPrice) !== cart.total) {
      throw new NotFoundResponse("Invalid total price");
    }

    cart.items.map(async (item) => {
      console.log("item", item._id);
    });

    // Create order
    const newOrder = new Order({
      customer: req.user._id,
      shippingAddress: { address, city, country },
      paymentMethod,
      orderItems: cart.items.map((item) => ({
        cartItem: {
          productId: item.productId._id,
          quantity: item.quantity,
        },
      })),
      orderNote,
      totalPrice,
    });

    // Save order
    await newOrder.save();

    // Clear cart
    await Cart.findByIdAndDelete(cart._id);

    // Update product stock

    await this.sendOrderConfirmationEmail(newOrder._id);

    return newOrder;
    // Send order confirmation email
  }

  static async sendOrderConfirmationEmail(orderId) {
    // Find the order
    const order = await Order.findById(orderId)
      .populate("customer")
      .populate("orderItems.cartItem.productId");

    //bill HTML
    const billHtml = generateOrderBillHTML(order);

    const mailOptions = {
      from: `NestMart Company <${process.env.EMAIL_USER}>`,
      to: order.customer.email,
      subject: `Order Confirmation - ${order._id}`,
      html: billHtml,
    };

    await transporter.sendMail(mailOptions);
  }
}

module.exports = OrderService;
