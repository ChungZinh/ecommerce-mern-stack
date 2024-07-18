const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const CategoryController = require("../controllers/category.controller");


router.use(require("../auth/authUtils").verifyToken);
router.post("/create", asyncHandler(CategoryController.create));
router.get("/getList", asyncHandler(CategoryController.getList));
router.get("/getAllSubCategories", asyncHandler(CategoryController.getAllSubCategories));
module.exports = router;
