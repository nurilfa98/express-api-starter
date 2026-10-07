const db = require("@config/db");

const findAll = () => {
    return db.execute("SELECT * FROM users WHERE isActive = 1");
};

const findOne = async (id) => {
    const [row] = await db.execute("SELECT * FROM users WHERE id = ? AND isActive = 1", [id]); 
    return row.length > 0 ? row[0] : null;
};

const findByUsernameOrEmail = async (username, email) => {
    const SQLQuery = "SELECT * FROM users WHERE (username = ? OR email = ?) AND isActive = 1";
    const [rows] = await db.execute(SQLQuery, [username, email]);
    return rows.length > 0 ? rows[0] : null;
};

const findByUsername = async (username) => {
    const SQLQuery = "SELECT * FROM users WHERE username = ? AND isActive = 1";
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

const deactiveUser = async (id) => {
    return await db.execute("UPDATE users SET isActive = 0 WHERE id = ?", [id]);
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
    findByUsername,
    deactiveUser
};

module.exports = userModel;
