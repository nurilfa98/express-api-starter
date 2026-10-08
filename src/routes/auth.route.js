const express = require("express");
const router = express.Router();
const authController = require("@controllers/auth.controller");
const validate = require("@middlewares/validate");
const { registerSchema, loginSchema } = require("@schemas/auth.schema");
const authMiddleware = require("@middlewares/auth");

// public route
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

// private route
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
