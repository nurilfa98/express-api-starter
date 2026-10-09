const ResponseHandler = require("@utils/response-handler");
const userModel = require("../models/user.model");
const userService = require("@services/user.service")

const getAllUsers = async (req, res, next) => {
    try {
        const data = await userService.findAll();
        return ResponseHandler.success(res, { data, message: "getAllUsers successfully" });
    } catch (error) {
        next(error);
    }
};

const getUsersById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await userService.findOne(id);
        
        return ResponseHandler.success(res, { data, message: "User found successfully" });
    } catch (error) {
        next(error);
    }
};

const removeUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await userService.remove(id);
        return ResponseHandler.success(res, { data, message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};


const deactiveUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await userService.deactive(id);
        return ResponseHandler.success(res, { data, message: "User deactive successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUsersById,
    deactiveUser,
    removeUser
};
