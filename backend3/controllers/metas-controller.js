const conexaoMysql = require("../databases/conexao_mysql").pool


exports.getMetasCidade = (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
    const qry =     `SELECT * FROM cidade_meta_vendas`;
    conn.query(qry, (erro, resultado)=> {
        conn.release();
        if(erro){
            console.log(erro)
        }else{
            console.log(resultado)
            res.status(200).send(resultado);
        }
      
    })
    })
 }






 exports.updateMetas = (req,res,next)=>{
        
    conexaoMysql.getConnection((error, conn)=>{

        req.body['newMetas'].map((item)=>{
            const valor = parseInt(item['meta_vendas']);
            const sql = `UPDATE cidade_meta_vendas set meta_vendas = ${valor} where id_cidade_meta_vendas = ${item['id_cidade_meta_vendas']}`;
            conn.query(sql, (erro, resultado)=>{
                if(erro){
                    console.log('erro')
                }
            })
        }) 

     })
        
     console.log('terminou')
    res.send('Metas Atualizadas')
 }
