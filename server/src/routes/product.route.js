const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const ProductController = require("../controllers/product.controller");
const { setPromise } = require("../services/redis.service");
router.get(
  "/",
  asyncHandler(ProductController.getProductsList)
);

router.use(require("../auth/authUtils").verifyToken);
router.post("/", asyncHandler(ProductController.createProduct));
router.put("/move-to-draft/:id", asyncHandler(ProductController.moveToDraft));
router.put(
  "/publish-product/:id",
  asyncHandler(ProductController.publishProduct)
);
router.put(
  "/:id",
  asyncHandler(ProductController.updateProduct)
);
module.exports = router;
