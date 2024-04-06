// Importa o pool de conexão com o banco de dados
const pool = require('../db');

// Verifica se o usuário existe
async function getUser(user, callback) {
    try {
        const query = 'SELECT idUser FROM usuario WHERE (email = ? OR nomeUser = ?) AND password = ?';
        const [rows, fields] = await conexao.query(query, [user.emailUsuario, user.emailUsuario, user.password]);

        if (rows.length > 0) {
            console.log('Usuário encontrado:', rows[0]);
            callback(null, rows);
        }

        else {
            console.log('Usuário não encontrado!');
            callback('Usuário não encontrado!', null);
        }
    }
    catch (error) {
        console.error('Erro ao selecionar usuário:', error);
        callback('Erro ao selecionar usuário.', null);
    }
};

// Obtém o perfil associado ao usuário
async function getPerfil(user, callback) {
    try {
        const query = 'SELECT u.idPerfil, p.descPerfil FROM usuario u JOIN perfil p ON u.idPerfil = p.idPerfil WHERE (email = ? OR nomeUser = ?)';
        const [rows, fields] = await conexao.query(query, [user.emailUsuario, user.emailUsuario]);

        if (rows.length > 0) {
            console.log('Perfil encontrado:', rows[0]);
            callback(null, rows[0].descPerfil); // Retorna a descrição do perfil encontrado
        }

        else {
            console.log('Perfil não encontrado!');
            callback('Perfil não encontrado!', null);
        } 
    } catch (error) {
        console.error('Erro ao selecionar perfil:', error);
        callback('Erro ao selecionar perfil.', null);
    }
}

module.exports = {
    getUser,
    getPerfil
};
