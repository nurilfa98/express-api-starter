const userModel = require("@models/user.model");
const { BadRequestException, NotFoundException } = require("@utils/exception-handler");

const findAll = async () => {
    const [users] = await userModel.findAll();
    const data = users.map(user => {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            isActive: user.isActive
        }
    })
    return data;
}

const findOne = async (id) => {
    const user = await userModel.findOne(id);    
    if (!user) {
        throw new NotFoundException("User not found");
    }

    const data = {
        id: user.id,
        username: user.username,
        email: user.email,
        isActive: user.isActive
    }

    return data;
}

const remove = async (id) => {
    if (!id) {
        throw new BadRequestException("param id is required");
    }

    const data = await findOne(id);

    await userModel.remove(id);

    return data;
}

const deactive = async (id) => {
    if (!id) {
        throw new BadRequestException("param id is required");
    }

    const data = await findOne(id);
    
    await userModel.deactiveUser(id);

    return data;
}

module.exports = {
    findAll,
    findOne,
    remove,
    deactive
}