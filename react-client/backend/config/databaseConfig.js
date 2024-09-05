const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify the connection pool to use with async/await
const promisePool = pool.promise();

process.on('SIGTERM', () => {
    pool.end((error) => {
        if (error) {
            console.error('Error closing the connection pool:', error);
        } else {
            console.log('Connection pool closed successfully!');
        }
        process.exit(0); // Exit the process after closing the pool
    });
});

const testConnection = async () => {
    try {
        const [rows] = await promisePool.query('SELECT VERSION()');
        console.log('Database connection successful! MySQL version:', rows[0]['VERSION()']);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        // Close pool connection:
        pool.end((error) => {
            if (error) {
                console.error('Error closing the connection pool:', error);
            } else {
                console.log('Connection pool closed.');
            }
        });
    }
};

testConnection();
module.exports = promisePool;