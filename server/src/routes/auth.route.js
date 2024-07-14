const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const AuthController = require("../controllers/auth.controller");


router.post('/sign-up', asyncHandler(AuthController.signUp));
router.post('/sign-in', asyncHandler(AuthController.signIn));
router.use(require("../auth/authUtils").verifyToken);
router.post("/logout", asyncHandler(AuthController.logout));
module.exports = router;