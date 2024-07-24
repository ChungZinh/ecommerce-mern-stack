const redis = require("redis");

const client = {
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};
const statusConnectRedis = {
  CONNECT: "connect",
  RECONNECTING: "reconnecting",
  END: "end",
  ERROR: "error",
};

const handleEventConnection = ({ instanceRedis }) => {
  instanceRedis.on(statusConnectRedis.CONNECT, () => {
    console.log("Connected to Redis");
  });

  instanceRedis.on(statusConnectRedis.RECONNECTING, () => {
    console.log("Reconnecting to Redis");
  });

  instanceRedis.on(statusConnectRedis.END, () => {
    console.log("End Redis");
  });

  instanceRedis.on(statusConnectRedis.ERROR, (error) => {
    console.log("Error Redis: ", error);
  });
};

const initRedis = () => {
  const instanceRedis = redis.createClient();
  client.instanceConnect = instanceRedis;
  handleEventConnection({
    instanceRedis: instanceRedis,
  });
};

const getRedis = () => {
  return client;
};

const closeRedis = () => {};

module.exports = {
  initRedis,
  getRedis,
  closeRedis,
};
