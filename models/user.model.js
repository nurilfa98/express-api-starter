const db = require("@db");

const findAll = () => {
    return db.execute("SELECT * FROM users");
};

const findOne = (id) => {
    return db.execute("SELECT * FROM users WHERE id = ?", [id]);
};

const findByUsername = async (username) => {
    const SQLQuery = "SELECT * FROM users WHERE username = ?";
    const [rows] = await db.execute(SQLQuery, [username]);
    return rows.length > 0 ? rows[0] : null;
};

const create = (data) => {
    SQLQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
    return db.execute(SQLQuery, [data.username, data.password]);
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
    findByUsername,
};

module.exports = userModel;
