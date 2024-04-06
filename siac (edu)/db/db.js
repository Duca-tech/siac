// Usando o MySQL como banco de dados
const mysql = require('mysql');

// Configurações para a conexão com o banco de dados
const dbConfig = {
    host: 'viaduct.proxy.rlwy.net',
    user: 'root',
    port: '59008',
    password: 'SOcIQaVfgDEqWGVHlkPAEDlJnUICubme',
    database: 'railway',
    waitForConnections: true,
    connectionLimit: 10
};

// Criação do pool de conexão
const pool = mysql.createPool(dbConfig);

module.exports = pool;
