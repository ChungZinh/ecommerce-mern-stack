const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const CategoryController = require("../controllers/category.controller");


router.use(require("../auth/authUtils").verifyToken);
router.post("/create", asyncHandler(CategoryController.create));
router.get("/get-list", asyncHandler(CategoryController.getList));
router.put("/update/:id", asyncHandler(CategoryController.update));
router.delete("/delete/:id", asyncHandler(CategoryController.delete));
module.exports = router;
