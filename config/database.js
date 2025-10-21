const mysql = require('mysql2');
require('dotenv').config();

// Gunakan connection pool untuk handle koneksi yang lebih baik
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'perpustakaan',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
});

// Test koneksi saat startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error koneksi database:', err.message);
        console.log('Mencoba reconnect...');
    } else {
        console.log('✅ Berhasil terhubung ke database MySQL');
        connection.release();
    }
});

// Handle pool errors
pool.on('error', (err) => {
    console.error('Database pool error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Database connection was closed.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
        console.log('Database has too many connections.');
    } else if (err.code === 'ECONNREFUSED') {
        console.log('Database connection was refused.');
    }
});

// Export promise-based interface
module.exports = pool.promise();