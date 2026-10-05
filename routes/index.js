const express = require("express");

// import controller
const userController = require("../controllers/user.controller");
const {
    validateCreateUser,
    validateUpdateUser,
} = require("../validators/user.validator");

// router setup
const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUsersById);
router.post("/users", validateCreateUser, userController.createUser);
router.patch("/users/:id", validateUpdateUser, userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

router.get("/expenses", (req, res) => {
    res.send("ini adalah route expenses");
});

module.exports = router;
