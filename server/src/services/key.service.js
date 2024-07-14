const Key = require("../models/key.model");

class KeyService {
  static async createKey({ userId, publicKey, privateKey, refreshToken }) {
    try {
      const filter = { userId: userId };
      const update = {
        publicKey,
        privateKey,
        refreshToken,
        refreshTokenUsed: [],
      };
      const options = { new: true, upsert: true };

      const key = await Key.findOneAndUpdate(filter, update, options);
      return key;
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  static async findByUserId(userId) {
    return Key.findOne({ userId: userId });
  }
}

module.exports = KeyService;
