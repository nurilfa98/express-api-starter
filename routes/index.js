const express = require("express");

// import controller
const userController = require("@controllers/user.controller");
const authController = require("@controllers/auth.controller");
const validate = require("@middlewares/validate");
const { createUserSchema } = require("@schemas/auth.schema");

// router setup
const router = express.Router();

router.post("/logout", authController.logout);

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUsersById);
router.post("/users", validate(createUserSchema), userController.createUser);
router.patch("/users/:id", validate(createUserSchema), userController.updateUser);
router.delete("/users/:id", userController.deleteUser);


module.exports = router;
