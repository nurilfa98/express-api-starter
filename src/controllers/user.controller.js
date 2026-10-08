const userModel = require("../models/user.model");

const getAllUsers = async (req, res) => {
    try {
        const [data] = await userModel.findAll();
        res.json({ message: "Users retrieved successfully", data });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const getUsersById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await userModel.findOne(id);
        if (!data) {
            res.status(404).json({ message: "User not found" });
        }
        res.json({
            message: "Users detail retrieved successfully",
            data
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
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

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "param id is required" });
        }

        const user = await userModel.findOne(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await userModel.remove(id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
    getUsersById,
    deactiveUser,
    deleteUser,
};
