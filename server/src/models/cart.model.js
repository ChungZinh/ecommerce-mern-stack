const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "carts";

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
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

cartSchema.pre("save", function (next) {
  this.total = this.products.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );
  next();
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, cartSchema);
