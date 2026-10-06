const express = require("express");

// import controller
const userController = require("@controllers/user.controller");
const validate = require("@middlewares/validate");
const { createUserSchema } = require("@schemas/user.schema");

// router setup
const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUsersById);
router.post("/users", validate(createUserSchema), userController.createUser);
router.patch("/users/:id", validate(createUserSchema), userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

router.get("/expenses", (req, res) => {
    res.send("ini adalah route expenses");
});

module.exports = router;
