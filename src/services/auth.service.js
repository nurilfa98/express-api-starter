const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userModel = require('@models/user.model');
const { ROLE } = require('@constants/roles');
const { BadRequestException, UnauthorizedException } = require('@utils/exception-handler');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('@config/jwt');
const redisClient = require('@config/redis');

const registerUser = async (payload) => {
    const { username, email, password, role } = payload;

    // Cek duplikasi user
    const user = await userModel.findByUsernameOrEmail(username, email);
    if (user) {
        throw new BadRequestException("Username or email already exist");
    }

    // Processing data & Hash Password
    const hashPassword = await bcrypt.hash(password, 10);
    const isSuperAdmin = role === "superadmin";

    const data = {
        email,
        username,
        password: hashPassword,
        role: isSuperAdmin ? ROLE.SUPERADMIN : ROLE.USER,
    };

    // Simpan ke database
    return await userModel.create(data);
};

const loginUser = async (payload) => {
    const { username, password } = payload;
    
    const user = await userModel.findByUsername(username);
    if (!user) {
        throw new BadRequestException("You don't have an account yet, register first!");
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        throw new BadRequestException("Password is incorrect");
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

    const data = { 
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token 
    }

    return data;
};

const logoutUser = async (authHeader) => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedException("Invalid token format");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const exp = decoded.exp;
        const ttl = exp - Math.floor(Date.now() / 1000); // Time To Live (detik)

        if (ttl > 0) {
            await redisClient.setEx(`blacklist_${token}`, ttl, "true");
        }

        return true;
    } catch (error) {
        throw new UnauthorizedException(error.message);
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};