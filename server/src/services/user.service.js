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

  static async getUsers(req) {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const user = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const userWithoutPassword = user.map((u) => {
      const { password, ...rest } = u._doc;
      return rest;
    });

    const total = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return {
      total,
      users: userWithoutPassword,
      lastMonthUsers,
    };
  }
}

module.exports = UserService;
