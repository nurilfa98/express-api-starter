const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("@static/jwt");
const redisClient = require("@config/redis");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("req.headers:: ", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const token = authHeader.split(" ")[1];
    // console.log("token:: ", token);

    // cek token di redis
    const isBlacklist = await redisClient.get(`blacklist_${token}`);
    console.log("isBlacklist:: ", isBlacklist);
    if (isBlacklist) {
        return res.status(401).json({ message: "Token is blacklisted" });
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET);
        // console.log("decode:: ", decode);

        req.user = decode;
        next();
    } catch (error) {
        console.log("=== Error: ", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
