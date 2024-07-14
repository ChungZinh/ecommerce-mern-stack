const { SuccessResponse } = require("../core/success.response");
const AuthService = require("../services/auth.service");
class AuthController {
  static async signUp(req, res, next) {
    new SuccessResponse({
      message: "Sign up successful",
      data: await AuthService.signUp(req.body),
    }).send(res);
  }

  static async signIn(req, res, next) {
    new SuccessResponse({
      message: "Sign in successful",
      data: await AuthService.signIn(req.body),
    }).send(res);
  }
}

module.exports = AuthController;
