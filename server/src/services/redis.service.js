const client = require("../db/init.redis");

var that = (module.exports = {
  setPromise: async ({ key, value }) => {
    try {
      await client.set(key, value);
      return true;
    } catch (error) {
      console.error("Error setting value in Redis:", error);
      throw error; // Ném lại lỗi để có thể xử lý ở nơi khác
    }
  },

  getPromise: async ({ key }) => {
    try {
      const value = await client.get(key);
      return value;
    } catch (error) {
      console.error("Error getting value from Redis:", error);
      throw error; // Ném lại lỗi để có thể xử lý ở nơi khác
    }
  },
});
