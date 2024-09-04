// MODEL Layer: create models to interact with the database.

const pool = require('../config/database');

// Função para obter usuário pelo e-mail
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuario WHERE email = ?', [email], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

module.exports = { getUserByEmail };
