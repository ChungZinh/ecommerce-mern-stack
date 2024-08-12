const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const UserController = require("../controllers/user.controller");

router.use(require("../auth/authUtils").verifyToken);
router.put("/:userId", asyncHandler(UserController.updateUser));
router.get("/", asyncHandler(UserController.getUsers));
module.exports = router;
