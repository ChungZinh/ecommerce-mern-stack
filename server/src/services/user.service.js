const { UnauthorizedResponse } = require("../core/error.response");
const User = require("../models/user.model");
class UserService {
  static async updateUser(req) {
    if (req.user._id !== req.params.userId) {
      throw new UnauthorizedResponse(
        "You are not authorized to perform this action"
      );
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );

    return updateUser;
  }
}

module.exports = UserService;
