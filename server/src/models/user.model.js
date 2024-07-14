const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "users";

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
      default: "Last Name",
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      default: "First Name",
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?w=826&t=st=1720888718~exp=1720889318~hmac=5a42c177018e2a9a6ca1dc00b2a7dba903d5d637338531154b0ba35f569b4a52",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
