const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { validateCreateUser } = require("../validators/user.validator");

router.post("/register", validateCreateUser, authController.register);
router.post("/login", validateCreateUser, authController.login);

module.exports = router;
