const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST || 'mysql-db-user-service',
  port: process.env.DB_PORT || 3308,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Melisse123*',
  database: process.env.DB_NAME || 'iotdb'
});

module.exports = db;
