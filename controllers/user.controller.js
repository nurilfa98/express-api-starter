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
        const [data] = await userModel.findOne(id);
        if (data.length < 1) {
            res.status(404).json({ message: "User not found" });
        }
        res.json({
            message: "Users detail retrieved successfully",
            data: data[0],
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const body = req.body;
        await userModel.create(body);
        res.status(201).json({ message: "Users created successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        if (!id) {
            res.status(400).json({ message: "param id is required" });
        }
        if (Object.keys(body).length < 1) {
            res.status(400).json({ message: "Please provide data" });
        }
        await userModel.update(id, body);
        res.json({ message: "Users updated successfully" });
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
            res.status(400).json({ message: "param id is required" });
        }
        await userModel.remove(id);
        res.json({ message: "Users deleted successfully" });
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
    createUser,
    updateUser,
    deleteUser,
};
