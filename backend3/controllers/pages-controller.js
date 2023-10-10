const conexaoMysql = require('../databases/conexao_mysql').pool



exports.getPagesAcesso = async(req, res, next)=>{
    conexaoMysql.getConnection((error, conn)=>{
        if(error) {res.status(500).send({error: error})}
         conn.query('select * from pages where pages.id_page in (?)', [req.body.pages], (error, result)=>{
          conn.release();
            if(error){res.status(500).send({error: error})}
          else{
            
            res.status(200).send(result)
             
            }
        })


        })
        
    }

    exports.getPages = async(req, res, next)=>{
      conexaoMysql.getConnection((error, conn)=>{
          if(error) {res.status(500).send({error: error})}
           conn.query('select * from pages', (error, result)=>{
            conn.release();
              if(error){res.status(500).send({error: error})}
            else{
              console.log(result)
              res.status(200).send(result)
     
              }
          })
          })
          
      }