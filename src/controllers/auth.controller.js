const authService = require("@services/auth.service");
const ResponseHandler = require("@utils/response-handler");

const register = async (req, res, next) => {
    try {
        await authService.registerUser(req.body);

        return ResponseHandler.created(res, { message: "Register success" });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const data = await authService.loginUser(req.body);

        return ResponseHandler.success(res, { data });
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        await authService.logoutUser(authHeader);
        
        return ResponseHandler.success(res,  { message: "Logout success" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register, 
    login, 
    logout 
};
