const conexaoMysql = require('../databases/conexao_mysql').pool
const conexaoMysqlAsterisk = require("../databases/conexao_mysql_asterisk").pool


exports.getRetencao= async(req, res, next)=>{
    conexaoMysql.getConnection((error, conn)=>{
        if(error) {res.status(500).send({error: error})}
         conn.query(`SELECT DATE_FORMAT(retencao.data, '%m/%Y') as data,(((retencao.intencoes_cancelamento - retencao.nao_retidos))/retencao.intencoes_cancelamento) as valor FROM retencao`, [req.body.pages], (error, result)=>{
          conn.release();
            if(error){res.status(500).send({error: error})}
          else{
            
            res.status(200).send(result)
             
            }
        })


        })           
      }

      exports.getLigacoesCobranca = async(req, res, next)=>{
        
        conexaoMysqlAsterisk.getConnection((error, conn)=>{
            if(error) {res.status(500).send({error: error})}
             conn.query(`SELECT 
             FORMAT(sum(cdr.nota)/count(*), 2) as valor, DATE_FORMAT(cdr.calldatestart, '%m/%Y') as mes_ano 
             FROM cdr
             where (  (cdr.lastdata like 'cobranca%' and cdr.dcontext!= 'interno') or
                      (
                               (
                               cdr.dstchannel like 'SIP/2011%' OR
                               cdr.dstchannel like 'SIP/2012%' OR
                               cdr.dstchannel like 'SIP/2013%' OR
                               cdr.dstchannel like 'SIP/2037%' OR
                               cdr.dstchannel like 'SIP/2666%' OR
                               cdr.dstchannel like 'SIP/2070%')	and cdr.lastdata not like'cobranca%' and src like '1%' and cdr.dcontext = 'interno')
                      or (cdr.src in ('2011','2013', '2037', '2070', '2012'))) and cdr.nota in ('0','1','2','3','4', '5') and (
                        (
                        extract( HOUR FROM cdr.calldatestart )>= 8 
                        AND extract( HOUR FROM cdr.calldatestart )<= 20
                        AND weekday(cdr.calldatestart ) >= 0 
                        AND weekday(cdr.calldatestart )<= 4
                        )
                        or
                        (
                         extract( HOUR FROM cdr.calldatestart )>= 8 
                        AND extract( HOUR FROM cdr.calldatestart )< 16
                        AND weekday(cdr.calldatestart ) = 5
                        )
                    ) 
                   GROUP BY DATE_FORMAT(cdr.calldatestart, '%m/%Y');`, [req.body.pages], (error, result)=>{
              conn.release();
                if(error){res.status(500).send({error: error})}
              else{
                
                res.status(200).send(result)
                 
                }
            })
    
    
            })           
          }
    



      exports.getMetaRetencao= async(req, res, next)=>{
        conexaoMysql.getConnection((error, conn)=>{
            if(error) {res.status(500).send({error: error})}
             conn.query(`SELECT * from meta where meta.descricao = 'retencao'`, [req.body.pages], (error, result)=>{
              conn.release();
                if(error){res.status(500).send({error: error})}
              else{
                
                res.status(200).send(result)
                 
                }
            })
    
    
            })           
          }

          exports.getMetaLigacoesCobranca = async(req, res, next)=>{
            conexaoMysql.getConnection((error, conn)=>{
                if(error) {res.status(500).send({error: error})}
                 conn.query(`SELECT * from meta where meta.descricao = 'ligacoes_cobranca'`, [req.body.pages], (error, result)=>{
                  conn.release();
                    if(error){res.status(500).send({error: error})}
                  else{
                    
                    res.status(200).send(result)
                     
                    }
                })
        
        
                })           
              }


              exports.getMetaLigacoesSuporte= async(req, res, next)=>{
                conexaoMysql.getConnection((error, conn)=>{
                    if(error) {res.status(500).send({error: error})}
                     conn.query(`SELECT * from meta where meta.descricao = 'ligacoes_suporte'`, [req.body.pages], (error, result)=>{
                      conn.release();
                        if(error){res.status(500).send({error: error})}
                      else{
                        
                        res.status(200).send(result)
                         
                        }
                    })
            
            
                    })           
                  }

              exports.getMetaLigacoesVendas = async(req, res, next)=>{
                conexaoMysql.getConnection((error, conn)=>{
                    if(error) {res.status(500).send({error: error})}
                     conn.query(`SELECT * from meta where meta.descricao = 'ligacoes_vendas'`, [req.body.pages], (error, result)=>{
                      conn.release();
                        if(error){res.status(500).send({error: error})}
                      else{
                        
                        res.status(200).send(result)
                         
                        }
                    })
            
            
                    })           
                  }




                  exports.getLigacoesVendas = async(req, res, next)=>{


                    conexaoMysqlAsterisk.getConnection((error, conn)=>{
                        if(error) {res.status(500).send({error: error})}
                         conn.query(`SELECT 
                         FORMAT(sum(cdr.nota)/count(*), 2) as valor, DATE_FORMAT(cdr.calldatestart, '%m/%Y') as mes_ano 
                         FROM cdr
                         where (  (cdr.lastdata like 'vendas%' and cdr.dcontext!= 'interno') or
                                  (
                                           (
                                            cdr.dstchannel like 'SIP/2000%' OR
                                            cdr.dstchannel like 'SIP/2001%' OR
                                            cdr.dstchannel like 'SIP/2015%' OR
                                            cdr.dstchannel like 'SIP/2017%' OR
                                            cdr.dstchannel like 'SIP/2041%' OR
                                            cdr.dstchannel like 'SIP/2043%' OR
                                            cdr.dstchannel like 'SIP/2048%' OR
                                            cdr.dstchannel like 'SIP/2074%' OR
                                            cdr.dstchannel like 'SIP/2067%' OR
                                            cdr.dstchannel like 'SIP/2068%' OR
                                            cdr.dstchannel like 'SIP/2069%' OR
                                            cdr.dstchannel like 'SIP/2079%' OR
                                            cdr.dstchannel like 'SIP/2084%')	and cdr.lastdata not like'vendas%' and src like '1%' and cdr.dcontext = 'interno')
                                  or (cdr.src in ('2000',
                                  '2001',
                                  '2015',
                                  '2017',
                                  '2041',
                                  '2043',
                                  '2048',
                                  '2074',
                                  '2067',
                                  '2068',
                                  '2069',
                                  '2079',
                                  '2084'))) and cdr.nota in ('0','1','2','3','4', '5') and (
                                    (
                                    extract( HOUR FROM cdr.calldatestart )>= 8 
                                    AND extract( HOUR FROM cdr.calldatestart )<= 20
                                    AND weekday(cdr.calldatestart ) >= 0 
                                    AND weekday(cdr.calldatestart )<= 4
                                    )
                                    or
                                    (
                                     extract( HOUR FROM cdr.calldatestart )>= 8 
                                    AND extract( HOUR FROM cdr.calldatestart )< 16
                                    AND weekday(cdr.calldatestart ) = 5
                                    )
                                ) 
                               GROUP BY DATE_FORMAT(cdr.calldatestart, '%m/%Y');`, [req.body.pages], (error, result)=>{
                          conn.release();
                            if(error){res.status(500).send({error: error})}
                          else{
                            
                            res.status(200).send(result)
                             
                            }
                        })
                
                
                        })           
                      }


    
 exports.getLigacoesSuporte = async(req, res, next)=>{


                        conexaoMysqlAsterisk.getConnection((error, conn)=>{
                            if(error) {res.status(500).send({error: error})}
                             conn.query(`SELECT 
                             FORMAT(sum(cdr.nota)/count(*), 2) as valor, DATE_FORMAT(cdr.calldatestart, '%m/%Y') as mes_ano 
                             FROM cdr
                             where (  (cdr.lastdata like 'suporte%' and cdr.dcontext!= 'interno') or
                                      (
                                               (
                                                cdr.dstchannel like 'SIP/2003%' OR
                                                cdr.dstchannel like 'SIP/2007%' OR
                                                cdr.dstchannel like 'SIP/2039%' OR
                                                cdr.dstchannel like 'SIP/2040%' OR
                                                cdr.dstchannel like 'SIP/2046%' OR
                                                cdr.dstchannel like 'SIP/2060%' OR
                                                cdr.dstchannel like 'SIP/2049%' OR
                                                cdr.dstchannel like 'SIP/2064%' OR
                                                cdr.dstchannel like 'SIP/2065%' OR
                                                cdr.dstchannel like 'SIP/2073%' OR
                                                cdr.dstchannel like 'SIP/2080%'
                                        )	and cdr.lastdata not like'suporte%' and src like '1%' and cdr.dcontext = 'interno')
                                             or (cdr.src in (
                                                                  '2003',
                                                                  '2007',
                                                                  '2039',
                                                                  '2040',
                                                                  '2060',
                                                                  '2046',
                                                                  '2049',
                                                                  '2064',
                                                                  '2065',
                                                                  '2073',
                                                                  '2080'))) and cdr.nota in ('0','1','2','3','4', '5') and         (
                                                                    (
                                                                    extract( HOUR FROM cdr.calldatestart )>= 8 
                                                                    AND extract( HOUR FROM cdr.calldatestart )<= 20
                                                                    AND weekday(cdr.calldatestart ) >= 0 
                                                                    AND weekday(cdr.calldatestart )<= 4
                                                                    )
                                                                    or
                                                                    (
                                                                    extract( HOUR FROM cdr.calldatestart )>= 8 
                                                                    AND extract( HOUR FROM cdr.calldatestart )< 16
                                                                    AND weekday(cdr.calldatestart ) = 5
                                                                    )
                                                                  ) 
                                   GROUP BY DATE_FORMAT(cdr.calldatestart, '%m/%Y');`, [req.body.pages], (error, result)=>{
                              conn.release();
                                if(error){res.status(500).send({error: error})}
                              else{
                                
                                res.status(200).send(result)
                                 
                                }
                            })
                    
                    
                            })           
                          }
    
    