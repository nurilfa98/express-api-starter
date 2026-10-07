const db = require("@config/db");

const findAll = () => {
    return db.execute("SELECT * FROM users");
};

const findOne = (id) => {
    return db.execute("SELECT * FROM users WHERE id = ?", [id]);
};

const findByUsernameOrEmail = async (username, email) => {
    const SQLQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
    const [rows] = await db.execute(SQLQuery, [username, email]);
    return rows.length > 0 ? rows[0] : null;
};

const findByUsername = async (username) => {
    const SQLQuery = "SELECT * FROM users WHERE username = ?";
    const [rows] = await db.execute(SQLQuery, [username]);
    return rows.length > 0 ? rows[0] : null;
};

const create = (data) => {
    SQLQuery = "INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)";
    return db.execute(SQLQuery, [data.email, data.username, data.password, data.role]);
};

const update = (id, data) => {
    // SQLQuery = "UPDATE users SET username = ?, password = ? WHERE id = ?";
    // return db.execute(SQLQuery, [data.username, data.password, id]);

    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = `${keys.map((key, index) => `${key} = ?`).join(", ")}`;
    const SQLQuery = `UPDATE users SET ${setClause} WHERE id = ?`;
    return db.execute(SQLQuery, [...values, id]);
};

const remove = (id) => {
    return db.execute("DELETE FROM users WHERE id = ?", [id]);
};

const userModel = {
    findAll,
    findOne,
    create,
    update,
    remove,
    findByUsernameOrEmail,
    findByUsername
};

module.exports = userModel;
