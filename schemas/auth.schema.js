const { z } = require("zod");

// Base credential (dipakai untuk login)
const loginSchema = z.object({
    username: z
        .string({ required_error: "Username wajib diisi" })
        .min(1, "Username tidak boleh kosong"),
    password: z
        .string({ required_error: "Password wajib diisi" })
        .min(1, "Password tidak boleh kosong"),
});

// Register schema (turunan dari loginSchema + field tambahan)
const registerSchema = loginSchema.extend({
    email: z
        .string({ required_error: "Email wajib diisi" })
        .min(1, "Email tidak boleh kosong")
        .email({}, "Format email tidak valid"),
    role: z.string().optional().default("user"),
});

module.exports = {
    loginSchema,
    registerSchema,
};