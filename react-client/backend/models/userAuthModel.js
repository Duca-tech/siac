// MODEL Layer: create models to interact with the database.

const pool = require('../config/databaseConfig');

// Get user by inputed email:
const getUserByEmail = async (email) => {
    try {
        const [rows] = await promisePool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows;
    } catch (error) {
        throw new Error('Erro ao buscar usuário por email: ' + error.message);
    }
};

const getUserProfileAndPermissions = async (userId) => {
    try {
        const [rows] = await pool.query(
            `SELECT p.tipo as perfil, perm.nome as permissao 
             FROM usuario_perfil up 
             JOIN perfil p ON up.id_perfil = p.id 
             JOIN perfil_permissao pp ON p.id = pp.id_perfil 
             JOIN permissao perm ON pp.id_permissao = perm.id 
             WHERE up.id_usuario = ?`,
            [userId]
        );
        return rows;
    } catch (error) {
        throw new Error('Erro ao buscar perfil e permissões do usuário: ' + error.message);
    }
};

module.exports = {
    getUserByEmail,
    getUserProfileAndPermissions
};