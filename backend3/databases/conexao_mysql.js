const mysql = require('mysql2');

var pool = mysql.createPool({
    host: '192.168.88.22',
    port: 3306,
    user: 'root',
    password:'@@#123mudar',
    database: 'etelecom_diretoria'
})

exports.pool = pool;