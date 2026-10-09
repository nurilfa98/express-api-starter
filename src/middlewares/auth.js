const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("@config/jwt");
const redisClient = require("@config/redis");
const { UnauthorizedException } = require("@utils/exception-handler");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedException("Invalid token format");
    }

    const token = authHeader.split(" ")[1];

    // cek token blacklist
    const isBlacklist = await redisClient.get(`blacklist_${token}`);
    if (isBlacklist) {
        throw new UnauthorizedException("Token is blacklisted");
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET);
        // console.log("decode:: ", decode);

        req.user = decode;
        next();
    } catch (error) {
        console.log("=== Error: ", error);
        throw new UnauthorizedException(error.message);
    }
};

module.exports = authMiddleware;
