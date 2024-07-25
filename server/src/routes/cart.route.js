const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const CartController = require("../controllers/cart.controller");
router.use(require("../auth/authUtils").verifyToken);
router.post("/", asyncHandler(CartController.addToCart));
module.exports = router;
