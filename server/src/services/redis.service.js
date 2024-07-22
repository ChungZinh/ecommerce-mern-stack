const redis = require("redis");
const client = redis.createClient();

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (err) => {
  console.log("Error " + err);
});

const topSellingKey = "products:top-selling";
const trendingKey = "products:trending";
const recentKey = "products:recent";

module.exports = {
  client,
  topSellingKey,
  trendingKey,
  recentKey,
};
