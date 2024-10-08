const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const CategoryController = require("../controllers/category.controller");

router.get("/", asyncHandler(CategoryController.getList));

router.use(require("../auth/authUtils").verifyToken);
router.post("/", asyncHandler(CategoryController.create));
router.put("/:id", asyncHandler(CategoryController.update));
router.delete("/:id", asyncHandler(CategoryController.delete));
module.exports = router;
