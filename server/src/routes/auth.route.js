const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const AuthController = require("../controllers/auth.controller");


router.post('/sign-up', asyncHandler(AuthController.signUp));
router.post('/sign-in', asyncHandler(AuthController.signIn));
module.exports = router;