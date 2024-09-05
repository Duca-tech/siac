// MODEL Layer: create models to interact with the database.

const pool = require('../config/databaseConfig');

// Get user by inputed email:
const getUserByEmail = async (email) => {
    const [rows] = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

module.exports = { getUserByEmail };
