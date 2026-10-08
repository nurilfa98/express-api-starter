const responseHandler = (req, res, next) => {
    res.success = (message = "Success", data = null, statusCode = 200) => {
        return res.status(statusCode).json({
            status: "success",
            message,
            ...(data !== null && { data }),
        });
    };

    res.created = (message = "Resource created successfully", data = null) => {
        return res.success(message, data, 201);
    };

    next();
};

module.exports = responseHandler;