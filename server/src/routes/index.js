const express = require("express");
const router = express.Router();

router.use("/api/auth", require("./auth.route"));
router.use("/api/user", require("./user.route"));
router.use("/api/category", require("./category.route"));
router.use("/api/product", require("./product.route"));
router.use("/api/contact", require("./contact.route"));

module.exports = router;
