const { z } = require("zod");

const createUserSchema = z.object({
    username: z
        .string()
        .nonempty("Username is required"),
    password: z
        .string()
        .nonempty("Password is required"),
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email format")
});

module.exports = { createUserSchema };