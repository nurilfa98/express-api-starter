const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../static/jwt");
const redisClient = require("../lib/redis-client");

const register = async (req, res) => {
    const body = req.body;

    try {
        const user = await userModel.findByUsername(body.username);
        if (user) {
            res.status(400).json({ message: "Username already exist" });
        }
        const hashPassword = await bcrypt.hash(body.password, 10);
        const data = {
            username: body.username,
            password: hashPassword,
        };
        await userModel.create(data);
        res.json({ message: "Register success" });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    const body = req.body;

    try {
        // check user
        const user = await userModel.findByUsername(body.username);
        if (!user) {
            res.status(400).json({
                message: "You don't have an account yet, register first!",
            });
        }

        // check password
        const isValid = bcrypt.compareSync(body.password, user.password);
        if (!isValid) {
            res.status(400).json({ message: "Password is incorrect" });
        }

        // create token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN,
            }
        );

        res.json({ message: "Login success", token });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const logout = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, JWT_SECRET);
        const exp = decode.exp;
        const ttl = exp - Math.floor(Date.now() / 1000); // time to live

        // save to redis
        const blacklistedToken = await redisClient.set(
            `blacklist_${token}`,
            token,
            {
                expiration: "EX", // pakai ttl dalam detik
                value: ttl, // TTL-nya berapa detik
                condition: "NX", // hanya di set kalau key belum ada
            }
        );

        res.json({ message: "Logout success" });
    } catch (error) {
        res.status(401).json({ message: "Invalid token during logout" });
    }
};

module.exports = { register, login };
