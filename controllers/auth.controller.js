const userModel = require("@models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("@static/jwt");
const redisClient = require("@config/redis");
const { ROLE } = require("@static/roles");

const register = async (req, res) => {
    const body = req.body;
    const isSuperAdmin = body.role === "superadmin";
    
    try {
        const user = await userModel.findByUsernameOrEmail(body.username, body.email);
        if (user) {
            return res.status(400).json({ message: "Username or email already exist" });
        }
        const hashPassword = await bcrypt.hash(body.password, 10);
        const data = {
            email: body.email,
            username: body.username,
            password: hashPassword,
            role: isSuperAdmin ? ROLE.SUPERADMIN : ROLE.USER
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
        const user = await userModel.findByUsername(body.username);
        
        if (!user) {
            return res.status(400).json({
                message: "You don't have an account yet, register first!",
            });
        }

        const isValid = bcrypt.compareSync(body.password, user.password);
        if (!isValid) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        // create token jwt
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN,
            }
        );

        res.json({ 
            message: "Login success", 
            data: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            access_token: token 
        });
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
        const ttl = exp - Math.floor(Date.now() / 1000); // Time To Live

        if (ttl > 0) {
            await redisClient.setEx(`blacklist_${token}`, ttl, "true");
        }

        res.json({ message: "Logout success" });
    } catch (error) {
        console.log("=== Error: ", error);
        res.status(401).json({ message: "Invalid token during logout" });
    }
};

module.exports = { register, login, logout };
