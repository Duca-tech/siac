const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify the connection pool to use with async/await
const promisePool = pool.promise();

// Close the pool connection when the application shuts down
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

module.exports = promisePool;