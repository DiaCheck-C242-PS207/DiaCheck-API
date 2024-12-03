const mysql = require('mysql2'); 

const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

const db = dbPool.promise();
module.exports = db;