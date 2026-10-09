class ResponseHandler {
    static success(res, { 
        data = null, 
        message = "Success", 
        statusCode = 200 
    } = {}) {
        return res.status(statusCode).json({
            success: true,
            message,
            ...(data !== null && { data }),
        });
    }
    
    static created(res, { 
        data = null, 
        message = "Data created successfully" 
    } = {}) {
        return this.success(res, { data: data, message: message, statusCode: 201 });
    }
}

module.exports = ResponseHandler;