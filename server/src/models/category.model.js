const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Category";
const COLLECTION_NAME = "categories";
// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

categorySchema.pre("save", async function (next) {
  if (this.parentCategory) {
    const parent = await Category.findById(this.parentCategory);
    if (parent) {
      parent.subCategories.push(this._id);
      await parent.save();
    }
  }
  next();
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, categorySchema);
