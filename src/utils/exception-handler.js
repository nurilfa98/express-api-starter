// Base Class
class ExceptionHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Sub-classes spesifik HTTP Error
class BadRequestException extends ExceptionHandler {
    constructor(message = "Bad Request") {
        super(400, message);
    }
}

class UnauthorizedException extends ExceptionHandler {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}

class ForbiddenException extends ExceptionHandler {
    constructor(message = "Forbidden") {
        super(403, message);
    }
}

class NotFoundException extends ExceptionHandler {
    constructor(message = "Resource Not Found") {
        super(404, message);
    }
}

class InternalServerException extends ExceptionHandler {
    constructor(message = "Internal Server Error") {
        super(500, message);
    }
}

module.exports = {
    ExceptionHandler,
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerException
};