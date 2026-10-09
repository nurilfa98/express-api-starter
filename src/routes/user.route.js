const express = require("express");
const router = express.Router();
const userController = require("@controllers/user.controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUsersById);
router.patch("/deactive-user/:id", userController.deactiveUser);
router.delete("/:id", userController.removeUser);

module.exports = router;