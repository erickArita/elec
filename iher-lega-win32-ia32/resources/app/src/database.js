const mysql = require('promise-mysql')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'cole',
    port:3306
    

});

function getConnection() {
    return connection;
}

module.exports = { getConnection };
