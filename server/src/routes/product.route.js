const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const ProductController = require("../controllers/product.controller");
router.get("/get-products-list", asyncHandler(ProductController.getProductsList));
router.get("/top-selling", asyncHandler(ProductController.getTopSelling));
router.post("/top-selling", asyncHandler(ProductController.addTopSelling));

router.use(require("../auth/authUtils").verifyToken);
router.post("/create", asyncHandler(ProductController.createProduct));
router.put("/move-to-draft/:id", asyncHandler(ProductController.moveToDraft));
router.put("/publish-product/:id", asyncHandler(ProductController.publishProduct));
router.put("/update-product/:id", asyncHandler(ProductController.updateProduct));
module.exports = router;
