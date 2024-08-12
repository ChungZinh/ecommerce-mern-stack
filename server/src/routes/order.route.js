const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const OrderController = require("../controllers/order.controller");

router.use(require("../auth/authUtils").verifyToken);
router.post("/", asyncHandler(OrderController.createOrder));
router.get("/", asyncHandler(OrderController.getOrders));
module.exports = router;
