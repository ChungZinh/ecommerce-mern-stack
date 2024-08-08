const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const CartController = require("../controllers/cart.controller");
router.use(require("../auth/authUtils").verifyToken);
router.post("/:userId", asyncHandler(CartController.addToCart));
router.get("/:userId", asyncHandler(CartController.getUserCart));
router.put("/:userId", asyncHandler(CartController.updateCart));
router.delete(
  "/:userId/items/:productId",
  asyncHandler(CartController.removeProductFromCart)
);
router.delete("/:userId", asyncHandler(CartController.removeCart));

module.exports = router;
