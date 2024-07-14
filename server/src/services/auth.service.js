const { generateTokens } = require("../auth/authUtils");
const { ErrorResponse } = require("../core/error.response");
const { findUserByEmail } = require("../models/repository/user.repository");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyService = require("../services/key.service");
const { isAbsolute } = require("path");
class AuthService {
  static async signUp({ email, mobile, password }) {
    if (!email || !mobile || !password) throw new ErrorResponse("Invalid data");

    if (mobile.length !== 10) throw new ErrorResponse("Invalid mobile number");

    if (password.length < 6)
      throw new ErrorResponse("Password must be atleast 6 characters");

    const user = await findUserByEmail(email);
    if (user) throw new ErrorResponse("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: email.split("@")[0],
      email,
      mobile,
      password: hashedPassword,
    });

    return newUser;
  }

  static async signIn({ email, password }) {
    if (!email || !password) throw new ErrorResponse("Invalid data");

    const user = await findUserByEmail(email);
    if (!user) throw new ErrorResponse("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ErrorResponse("Invalid password");

    // create token
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });

    const tokens = await generateTokens(
      {
        _id: user._id,
        email: user.email,
        mobile: user.mobile,
        isAdmin: user.isAdmin,
      },
      privateKey
    );

    await KeyService.createKey({
      userId: user._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      user,
      token: tokens.accessToken,
    };
  }
}

module.exports = AuthService;
