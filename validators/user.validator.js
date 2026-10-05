const { body } = require("express-validator");
const validator = require("../middlewares/validators");

const validateCreateUser = validator([
    {
        field: "username",
        rules: body("username").notEmpty().withMessage("Username is required"),
    },
    {
        field: "password",
        rules: body("password").notEmpty().withMessage("Password is required"),
    },
]);

const validateUpdateUser = validator([
    {
        field: "username",
        rules: body("username")
            .optional()
            .notEmpty()
            .withMessage("Username is required"),
    },
    {
        field: "password",
        rules: body("password")
            .optional()
            .notEmpty()
            .withMessage("Password is required"),
    },
]);

module.exports = {
    validateCreateUser,
    validateUpdateUser,
};
