const pg = require('pg');

const config ={
    host: '177.66.249.70',
    user:  'eserv_leitura',
    password: 'a01065c76fb3c612e2520b19aacf93e6',
    database: 'hubsoft',
    port:     '9432'
}
const conexao = new pg.Client(config);

conexao.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
module.exports = conexao 