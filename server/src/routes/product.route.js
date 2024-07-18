const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const ProductController = require("../controllers/product.controller");

router.use(require("../auth/authUtils").verifyToken);
router.post("/create", asyncHandler(ProductController.createProduct));
router.get("/get-products-list", asyncHandler(ProductController.getProductsList));
module.exports = router;
