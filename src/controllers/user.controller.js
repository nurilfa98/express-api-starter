const ResponseHandler = require("@utils/response-handler");
const userModel = require("../models/user.model");
const userService = require("@services/user.service")

const getAllUsers = async (req, res, next) => {
    try {
        const data = await userService.findAll();
        return ResponseHandler.success(res, { data });
    } catch (error) {
        next(error);
    }
};

const getUsersById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await userService.findOne(id);
        
        return ResponseHandler.success(res, { data });
    } catch (error) {
        next(error);
    }
};

const deactiveUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "param id is required" });
        }
        const user = await userModel.findOne(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await userModel.deactiveUser(id);
        res.json({ message: "User deactivate successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await userService.remove(id);
        return ResponseHandler.success(res, { data, message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUsersById,
    deactiveUser,
    deleteUser,
};
