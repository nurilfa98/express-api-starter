const { validationResult } = require("express-validator");

const validator = (fieldValidators = []) => {
    const middlewares = [];

    for (const { field, rules } of fieldValidators) {
        middlewares.push(rules, (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const err = errors.array().find((e) => e.path === field);
                if (err) {
                    return res.status(400).json({ message: err.msg });
                }
            }
            next();
        });
    }

    return middlewares;
};

module.exports = validator;
