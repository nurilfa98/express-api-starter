const validate = (schema) => (req, res, next) => {
    // safeParse tidak akan melempar (throw) error jika validasi gagal
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const firstError = result.error.issues[0];
        return res.status(400).json({
            message: firstError.message,
        });
    }
    
    req.body = result.data;
    next();
};

module.exports = validate;