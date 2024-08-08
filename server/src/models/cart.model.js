const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "carts";

const cartItemSchema = new mongoose.Schema({
  productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
  },
  quantity: {
      type: Number,
      required: true,
      default: 1,
  },
});

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "COMPLETED", "FAILED", "PENDING"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

cartSchema.pre("save", async function (next) {
  const cart = this;
  await cart.populate('items.productId');
  cart.total = cart.items.reduce((acc, item) => {
    const product = item.productId;
    const price = product.prom_price || product.regu_price;
    const quantity = item.quantity;
    if (isNaN(price) || isNaN(quantity)) {
      return acc;
    }
    return acc + quantity * price;
  }, 0);
  next();
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, cartSchema);
