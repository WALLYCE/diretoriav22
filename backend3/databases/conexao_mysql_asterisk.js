const mysql = require('mysql2');

var pool = mysql.createPool({
    host: '192.168.88.254',
    port: 3306,
    user: 'etelecom',
    password:'@@#123mudar',
    database: 'asteriskcdrdb'
})

exports.pool = pool;