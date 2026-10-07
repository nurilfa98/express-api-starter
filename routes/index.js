const express = require("express");

// import controller
const userController = require("@controllers/user.controller");
const authController = require("@controllers/auth.controller");

// router setup
const router = express.Router();

router.post("/logout", authController.logout);

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUsersById);
router.patch("/deactive-user/:id", userController.deactiveUser);
router.delete("/users/:id", userController.deleteUser);


module.exports = router;
