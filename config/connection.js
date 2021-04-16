const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost', 
        user: 'root',
        password: 'Batman5562',
        database: 'employeeTracker'
    }
);

module.exports = db