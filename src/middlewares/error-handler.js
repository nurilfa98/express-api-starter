const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    return res.status(err.statusCode).json({
        success: false,
        message: err.message || 'Internal server error',
        // Sertakan stack trace hanya saat mode development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = errorHandler;