const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error("Failed connect to Redis:", err.message);
    }
})();

module.exports = redisClient;