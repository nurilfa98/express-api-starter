const express = require("express");
const router = express.Router();
const authController = require("@controllers/auth.controller");
const validate = require("@middlewares/validate");
const { createUserSchema } = require("@schemas/user.schema");

router.post("/register", validate(createUserSchema), authController.register);
router.post("/login", validate(createUserSchema), authController.login);

module.exports = router;
