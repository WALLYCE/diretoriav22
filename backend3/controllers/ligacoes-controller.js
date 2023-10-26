const conexaoMysql = require("../databases/conexao_mysql_asterisk").pool
const conexao = require('../databases/conexao');



exports.getLigacoesRealizadas = (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
    const qry =     `select ramal.nome as ramal, DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
    case 
    when disposition = 'ANSWERED' then 'Atendida'
    else 'Não Atendida'
    end as resposta,
    SUBSTRING_INDEX(SUBSTRING_INDEX(lastdata, '/3', -1), ',', 1) as telefone, cdr.uniqueid as gravacao FROM
    cdr
    inner join ramal on cdr.src = ramal.numero where cdr.disposition = 'ANSWERED' and TIMESTAMPDIFF(SECOND, cdr.calldateanswer, cdr.calldateend) >=15 and cdr.dst = 'A' and CAST(calldatestart AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and  CAST(calldatestart AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')`;
    conn.query(qry, (erro, resultado)=> {
        conn.release();
        if(erro){
            console.log(erro)
            res.status(400).send(erro)
        }else{
           
            res.status(200).send(resultado);
        }
    
    })
    })
 }



exports.getLigacoesRealizadasVendas = (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
    const qry =     `select ramal.nome as ramal, k.data_ligacao, k.resposta, k.telefone, k.gravacao, k.avaliacao from (select cdr.src as ramal, DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
    case 
    when disposition = 'ANSWERED' then 'Atendida'
    else 'Não Atendida'
    end as resposta,
    SUBSTRING_INDEX(SUBSTRING_INDEX(lastdata, '/3', -1), ',', 1) as telefone,
    cdr.uniqueid as gravacao,
    case when cdr.nota = '1' or cdr.nota = '2' or cdr.nota = '3' or cdr.nota = '4' or cdr.nota = '5' then cdr.nota else 'sem nota' end  as avaliacao
    FROM cdr 
    where cdr.disposition = 'ANSWERED' and TIMESTAMPDIFF(SECOND, cdr.calldateanswer, cdr.calldateend) >=15 and cdr.dst = 'A' and CAST(calldatestart AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and  CAST(calldatestart AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')) as k
    inner join ramal on k.ramal = ramal.numero
    where k.ramal in ('2000',
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
        '2084') `;
    conn.query(qry, (erro, resultado)=> {
        conn.release();
        if(erro){
            console.log(erro)
            res.status(400).send(erro)
        }else{
           
            res.status(200).send(resultado);
        }
    
    })
    })
 }

 exports.getLigacoesRealizadasVendasBruto = (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
    const qry =     `select ramal.nome as ramal, k.data_ligacao, k.resposta, k.telefone, k.gravacao, k.avaliacao from (select cdr.src as ramal, DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
    case 
    when disposition = 'ANSWERED' then 'Atendida'
    else 'Não Atendida'
    end as resposta,
    SUBSTRING_INDEX(SUBSTRING_INDEX(lastdata, '/3', -1), ',', 1) as telefone,
    cdr.uniqueid as gravacao,
    case when cdr.nota = '1' or cdr.nota = '2' or cdr.nota = '3' or cdr.nota = '4' or cdr.nota = '5' then cdr.nota else 'sem nota' end  as avaliacao
    FROM cdr 
    where CAST(calldatestart AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and  CAST(calldatestart AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')) as k
    inner join ramal on k.ramal = ramal.numero
    where k.ramal in ('2084', '2074','2079','2068','2041','2043','2001')`;
    conn.query(qry, (erro, resultado)=> {
        conn.release();
        if(erro){
            console.log(erro)
            res.status(400).send(erro)
        }else{
           
            res.status(200).send(resultado);
        }
    
    })
    })
 }
 exports.getLigacoesRealizadasQualidade = (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
    const qry =     `select ramal.nome as ramal, k.data_ligacao, k.resposta, k.telefone, k.gravacao, k.avaliacao from (select cdr.src as ramal, DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
    case 
    when disposition = 'ANSWERED' then 'Atendida'
    else 'Não Atendida'
    end as resposta,
    SUBSTRING_INDEX(SUBSTRING_INDEX(lastdata, '/3', -1), ',', 1) as telefone, cdr.uniqueid as gravacao,
    case when cdr.nota = '1' or cdr.nota = '2' or cdr.nota = '3' or cdr.nota = '4' or cdr.nota = '5' then cdr.nota else 'sem nota' end  as avaliacao
    FROM cdr 
    where cdr.disposition = 'ANSWERED' and TIMESTAMPDIFF(SECOND, cdr.calldateanswer, cdr.calldateend) >=15 and cdr.dst = 'A' and CAST(calldatestart AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and  CAST(calldatestart AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')) as k
    inner join ramal on k.ramal = ramal.numero
    where k.ramal in ('2018', '2057', '2061')`;
    conn.query(qry, (erro, resultado)=> {
        conn.release();
        if(erro){
            console.log(erro)
            res.status(400).send(erro)
        }else{
           
            res.status(200).send(resultado);
        }
    
    })
    })
 }

 exports.getLigacoesRealizadasSac = (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
    const qry =     `select k.ramal, k.data_ligacao, k.resposta, k.telefone, k.gravacao, k.avaliacao from (select ramal.nome as ramal, cdr.src as numero, DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
    case 
    when disposition = 'ANSWERED' then 'Atendida'
    else 'Não Atendida'
    end as resposta, 
    SUBSTRING_INDEX(SUBSTRING_INDEX(lastdata, '/3', -1), ',', 1) as telefone, cdr.uniqueid as gravacao,
    case when cdr.nota = '1' or cdr.nota = '2' or cdr.nota = '3' or cdr.nota = '4' or cdr.nota = '5' then cdr.nota else 'sem nota' end  as avaliacao FROM cdr
    inner join ramal on cdr.src = ramal.numero
    where cdr.disposition = 'ANSWERED' and TIMESTAMPDIFF(SECOND, cdr.calldateanswer, cdr.calldateend) >=15 and cdr.dst = 'A' and CAST(calldatestart AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and  CAST(calldatestart AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')) as k
    where k.numero in ('2049', '2065','2040','2060','2064','2003','2007', '2039', '2073', '2046', '2080', '2019', '2056', '2063', '2009', '2072')`;
    conn.query(qry, (erro, resultado)=> {
        conn.release();
        if(erro){
            console.log(erro)
            res.status(400).send(erro)
        }else{
           
            res.status(200).send(resultado);
        }
    
    })
    })
 }

 exports.getLigacoesRealizadasCobranca = (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
    const qry =     `select k.ramal, k.data_ligacao, k.resposta,  k.telefone, k.gravacao, k.avaliacao from (select ramal.nome as ramal, cdr.src as numero,  DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
    case 
    when disposition = 'ANSWERED' then 'Atendida'
    else 'Não Atendida'
    end as resposta, 
    SUBSTRING_INDEX(SUBSTRING_INDEX(lastdata, '/3', -1), ',', 1) as telefone, cdr.uniqueid as gravacao,
    case when cdr.nota = '1' or cdr.nota = '2' or cdr.nota = '3' or cdr.nota = '4' or cdr.nota = '5' then cdr.nota else 'sem nota' end  as avaliacao FROM cdr
    inner join ramal on cdr.src = ramal.numero
    where cdr.disposition = 'ANSWERED' and TIMESTAMPDIFF(SECOND, cdr.calldateanswer, cdr.calldateend) >=20 and cdr.dst = 'A' and CAST(calldatestart AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and  CAST(calldatestart AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')) as k
    where k.numero in ('2011','2013', '2037', '2070', '2012')`;
    conn.query(qry, (erro, resultado)=> {
        conn.release();
        if(erro){
            console.log(erro)
            res.status(400).send(erro)
        }else{
           
            res.status(200).send(resultado);
        }
    
    })
    })
 }


 exports.getLigacoesRealizadasCobrancaBruto = (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
    const qry =     `select k.ramal, k.data_ligacao, k.resposta,  k.telefone, k.gravacao, k.avaliacao from (select ramal.nome as ramal, cdr.src as numero,  DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
    case 
    when disposition = 'ANSWERED' then 'Atendida'
    else 'Não Atendida'
    end as resposta, 
    SUBSTRING_INDEX(SUBSTRING_INDEX(lastdata, '/3', -1), ',', 1) as telefone, cdr.uniqueid as gravacao,
    case when cdr.nota = '1' or cdr.nota = '2' or cdr.nota = '3' or cdr.nota = '4' or cdr.nota = '5' then cdr.nota else 'sem nota' end  as avaliacao FROM cdr
    inner join ramal on cdr.src = ramal.numero
    where cdr.dst = 'A' and CAST(calldatestart AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and  CAST(calldatestart AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')) as k
    where k.numero in ('2011','2013', '2037', '2070', '2012')`;
    conn.query(qry, (erro, resultado)=> {
        conn.release();
        if(erro){
            console.log(erro)
            res.status(400).send(erro)
        }else{
           
            res.status(200).send(resultado);
        }
    
    })
    })
 }


 exports.getLigacoesRecebidas= (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
        const qry =     `SELECT LEFT(SUBSTRING_INDEX(dstchannel, '/', -1), 4) as Ramal,lastdata as fila, DATE_FORMAT(calldate,'%d/%m/%Y %H:%i:%s') as data_ligacao,
        case 
        when disposition = 'ANSWERED' then 'Atendida'
        else 'Não Atendida'
        end as resposta FROM cdr where lastapp = 'Queue' and dcontext != 'interno' and dstchannel not like '%Agent%' and dstchannel != '' and CAST(calldate AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and  CAST(calldate AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')  `;
        conn.query(qry, (erro, resultado)=> {
            conn.release();
            if(erro){
                console.log(erro)
                res.status(400).send(erro)
            }else{
               
                res.status(200).send(resultado);
            }
        
        })
        })
}

exports.getLigacoesRecebidasSac= (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
      const qry = /*`select distinct x.telefone, x.data, 
      CASE when ramal.nome is null then 'NÃO ATENDIDAS' else ramal.nome end as Ramal, x.espera_fila, x.tempo_ligacao, x.gravacao, x.avaliacao  from (select  k.telefone,  DATE_FORMAT(k.time,'%d/%m/%Y %H:%i:%s') as data, 
      case when queue_log.event = 'ABANDON' THEN 'ABANDONADAS' ELSE queue_log.agent end as ramal,
      case when queue_log.event = 'ABANDON' THEN queue_log.data3  when queue_log.event = 'TRANSFER' then queue_log.data3 ELSE queue_log.data1 end as espera_fila,
      case when queue_log.event = 'ABANDON' THEN '0'  when queue_log.event = 'TRANSFER' then queue_log.data4 ELSE queue_log.data2 end as tempo_ligacao,
      k.uniqueid as gravacao,
      CASE when k.nota = '-1' then 'sem nota' when k.nota = '' then 'sem nota' else k.nota end as avaliacao
       from (select queue_log.time, cdr.src as telefone, cdr.*, max(queue_log.id) as finalizado from queue_log
      inner join cdr on cdr.uniqueid = queue_log.callid
      where queue_log.queuename = 'suporte' and cdr.src not like('2%')
      GROUP BY queue_log.callid) k
      inner join queue_log on queue_log.id = k.finalizado 
      where CAST(queue_log.time AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') 
                              and  CAST(queue_log.time AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')  
                            AND  (
                                  extract( HOUR FROM queue_log.time )>= 8 
                                  AND extract( HOUR FROM queue_log.time )<= 20
                                  AND weekday(queue_log.time ) >= 0 
                                  AND weekday(queue_log.time )<= 4
                              )
                              OR (
                                extract( HOUR FROM 	queue_log.time )>= 8 
                                AND extract( HOUR FROM 	queue_log.time )<= 15
                                AND  weekday(	queue_log.time) = 5
                            )
                             ) x inner join ramal on CONCAT('Agent/', ramal.numero) = x.ramal  where (x.tempo_ligacao >10 and extract(hour from str_to_date(x.data, '%d/%m/%Y %H:%i:%s'))>=8) or (x.tempo_ligacao='0' and  extract(hour from str_to_date(x.data, '%d/%m/%Y %H:%i:%s'))>=8)`*/
      
        /*`select distinct x.telefone, x.data, 
            CASE when ramal.nome is null then 'NÃO ATENDIDAS' else ramal.nome end as Ramal, x.espera_fila, x.tempo_ligacao, x.gravacao, x.avaliacao from (SELECT
            k.telefone,
            DATE_FORMAT(k.data_ligacao,'%d/%m/%Y %H:%i:%s') as data,
            queue_log.agent as Ramal,
            CASE when queue_log.event = 'TRANSFER' then queue_log.data3 else queue_log.data1 end as espera_fila,
            CASE when queue_log.event = 'TRANSFER' then queue_log.data4 else queue_log.data2 end as tempo_ligacao,
            k.gravacao,
            CASE when k.nota = '-1' then 'sem nota' when k.nota = '' then 'sem nota' else k.nota end as avaliacao
        FROM
            (
            SELECT
                cdr.calldatestart AS data_ligacao,
                cdr.uniqueid,
                cdr.src AS telefone,
                min( queue_log.id ) AS origem,
                max( queue_log.id ) AS finalizado,
                cdr.uniqueid as gravacao,
                cdr.nota
            FROM
                cdr
                INNER JOIN queue_log ON queue_log.callid = cdr.uniqueid 
            WHERE
                ((
                        cdr.lastapp = 'Queue' 
                        ) 
                    AND ( cdr.lastdata like 'suporte%' ) 
                    AND ( cdr.disposition = 'ANSWERED' ) 
                    AND cdr.dcontext != 'interno' 
                AND ( cdr.dstchannel LIKE 'Agent%' )) 
            GROUP BY
                cdr.uniqueid 
            ORDER BY
                queue_log.id 
            ) as k
            INNER JOIN queue_log ON queue_log.id = k.finalizado
            where queue_log.event in ('COMPLETECALLER', 'COMPLETEAGENT', 'TRANSFER')
            AND (
                (
                    extract( HOUR FROM k.data_ligacao )>= 8 
                    AND extract( HOUR FROM k.data_ligacao )<= 20
                    AND weekday(k.data_ligacao ) >= 0 
                    AND weekday(k.data_ligacao )<= 4
                ) 
                OR (
                    extract( HOUR FROM k.data_ligacao )>= 8 
                    AND extract( HOUR FROM k.data_ligacao )<= 15
                  AND  weekday(k.data_ligacao) = 5
                )
                )
            and CAST(k.data_ligacao AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') 
            and  CAST(k.data_ligacao AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')
            union
            SELECT
            cdr.src as telefone,
            DATE_FORMAT(queue_log.time,'%d/%m/%Y %H:%i:%s') as data,
          'ABANDONADAS' as Ramal,
            queue_log.data3 as espera_fila,
            '0' as tempo_ligacao,
            '' as gravacao,
            cdr.nota
            
            FROM
                queue_log
                INNER JOIN cdr ON cdr.uniqueid = queue_log.callid
            WHERE
            
                    ( queue_log.EVENT = 'ABANDON' ) 
                    and  queuename = 'suporte'
                    and dcontext!='interto'
                    AND (
                        (
                            extract( HOUR FROM 	queue_log.time )>= 8 
                            AND extract( HOUR FROM 	queue_log.time )<= 20
                            AND weekday(	queue_log.time) >= 0 
                            AND weekday(	queue_log.time )<= 4
                        ) 
                        OR (
                            extract( HOUR FROM 	queue_log.time )>= 8 
                            AND extract( HOUR FROM 	queue_log.time )<= 15
                          AND  weekday(	queue_log.time) = 5
                        )
                        ) 
                        and CAST(queue_log.time AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') 
                        and  CAST(queue_log.time AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')
                        ) as x
                        left join ramal on CONCAT('Agent/', ramal.numero) = x.Ramal where x.tempo_ligacao >10 or (x.tempo_ligacao = '0' and x.Ramal like '')`*/
          `SELECT cdr.src as telefone,
          DATE_FORMAT(cdr.calldatestart,'%d/%m/%Y %H:%i:%s')as data, 
         case when ramal.nome is null then 'NÃO ATENDIDAS' else ramal.nome end as Ramal,
         case when queue_log.event = 'CONNECT' then  queue_log.data1 else queue_log.data3 end as espera_fila,
         cdr.uniqueid as gravacao,
         case when cdr.nota = '1' or cdr.nota = '2' or cdr.nota = '3' or cdr.nota = '4' or cdr.nota = '5' then cdr.nota else 'sem nota' end  as avaliacao
         FROM cdr 
         inner join queue_log on (queue_log.callid = cdr.uniqueid and (queue_log.event = 'CONNECT' or queue_log.event= 'ABANDON') )
         LEFT join ramal on CONCAT('Agent/', ramal.numero) = cdr.dstchannel 
         where (
            (cdr.lastdata like 'suporte%' and cdr.dcontext!= 'interno') or
         
            (cdr.dstchannel like 'Agent%' and cdr.lastdata not like'suporte%' and src like '1%' and cdr.dcontext = 'interno')
            )
        and
            (
             (
            extract( HOUR FROM cdr.calldatestart )>= 8 
             AND extract( HOUR FROM cdr.calldatestart )<= 20
             AND weekday(cdr.calldatestart ) >= 0 
             AND weekday(cdr.calldatestart )<= 4
             and extract( HOUR FROM queue_log.time )>= 8 
             AND extract( HOUR FROM queue_log.time )<= 20
             AND weekday(queue_log.time ) >= 0 
             AND weekday(queue_log.time)<= 4
             )
             or
             (
              extract( HOUR FROM cdr.calldatestart )>= 8 
             AND extract( HOUR FROM cdr.calldatestart )< 16
             AND weekday(cdr.calldatestart ) = 5
             and   extract( HOUR FROM queue_log.time )>= 8 
             AND extract( HOUR FROM queue_log.time )< 16
             AND weekday(queue_log.time ) = 5
             )
         ) 

         and CAST(cdr.calldatestart as date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and   
         CAST(cdr.calldatestart as date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')
         ORDER BY cdr.calldatestart desc
         `

        
        conn.query(qry, (erro, resultado)=> {
            conn.release();
            if(erro){
                console.log(erro)
                res.status(400).send(erro)
            }else{
               
                res.status(200).send(resultado);
            }
        
        })
        })
 }

 
exports.getLigacoesRecebidasCobranca= (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
        const qry =     `SELECT cdr.src as telefone,
        DATE_FORMAT(cdr.calldatestart,'%d/%m/%Y %H:%i:%s')as data, 
       case when ramal.nome is null then 'NÃO ATENDIDA' else ramal.nome end as Ramal,
       case when queue_log.event = 'CONNECT' then  queue_log.data1 else queue_log.data3 end as espera_fila,
       cdr.uniqueid as gravacao,
       case when cdr.nota = '-1' or cdr.nota = '' or cdr.nota = '*'  then 'sem nota' else cdr.nota end  as avaliacao
       FROM cdr 
       inner join queue_log on (queue_log.callid = cdr.uniqueid and (queue_log.event = 'CONNECT' or queue_log.event= 'ABANDON') )
       LEFT join ramal on CONCAT('SIP/', ramal.numero) = SUBSTR(cdr.dstchannel,1, 8)
       where ((cdr.lastdata like 'cobranca%' and cdr.dcontext!= 'interno') or (
       (cdr.dstchannel like 'SIP/2011%' OR
       cdr.dstchannel like 'SIP/2012%' OR
       cdr.dstchannel like 'SIP/2013%' OR
       cdr.dstchannel like 'SIP/2037%' OR
       cdr.dstchannel like 'SIP/2666%' OR
       cdr.dstchannel like 'SIP/2070%') and cdr.lastdata not like'cobranca%' and src like '1%' and cdr.dcontext = 'interno')) and
       (
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

    and CAST(cdr.calldatestart as date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and   
    CAST(cdr.calldatestart as date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')
    ORDER BY cdr.calldatestart desc`;
        conn.query(qry, (erro, resultado)=> {
            conn.release();
            if(erro){
                console.log(erro)
                res.status(400).send(erro)
            }else{
               
                res.status(200).send(resultado);
            }
        
        })
        })
 }


 
exports.getLigacoesRecebidasVendas= (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
        const qry =     `SELECT cdr.src as telefone,
        DATE_FORMAT(cdr.calldatestart,'%d/%m/%Y %H:%i:%s')as data, 
       case when ramal.nome is null then 'NÃO ATENDIDA' else ramal.nome end as Ramal,
       case when queue_log.event = 'CONNECT' then  queue_log.data1 else queue_log.data3 end as espera_fila,
       cdr.uniqueid as gravacao,
       case when cdr.nota = '-1' or cdr.nota = '' or cdr.nota = '*'  then 'sem nota' else cdr.nota end  as avaliacao
       FROM cdr 
       inner join queue_log on (queue_log.callid = cdr.uniqueid and (queue_log.event = 'CONNECT' or queue_log.event= 'ABANDON') )
       LEFT join ramal on CONCAT('SIP/', ramal.numero) = SUBSTR(cdr.dstchannel,1, 8)
       where ((cdr.lastdata like 'vendas%' and cdr.dcontext!= 'interno') or (
       (cdr.dstchannel like 'SIP/2000%' OR
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
       cdr.dstchannel like 'SIP/2084%' ) and cdr.lastdata not like'vendas%' and src like '1%' and cdr.dcontext = 'interno')) and
       (
        (
       extract( HOUR FROM cdr.calldatestart )>= 8 
        AND extract( HOUR FROM cdr.calldatestart )<= 19
        AND weekday(cdr.calldatestart ) >= 0 
        AND weekday(cdr.calldatestart )<= 4
        )
        or
        (
         extract( HOUR FROM cdr.calldatestart )>= 8 
        AND extract( HOUR FROM cdr.calldatestart )<=12
        AND weekday(cdr.calldatestart ) = 5
        )
    ) 

    and CAST(cdr.calldatestart as date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and   
    CAST(cdr.calldatestart as date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')
    ORDER BY cdr.calldatestart desc`;
        conn.query(qry, (erro, resultado)=> {
            conn.release();
            if(erro){
                console.log(erro)
                res.status(400).send(erro)
            }else{
               
                res.status(200).send(resultado);
            }
        
        })
        })
 }

 exports.getGravacoes= (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
        const qry =     `select * from (select cdr.uniqueid as id, cdr.src as ramal, DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
        'Chamada Realizada' as modo, 
        SUBSTRING_INDEX(lastdata, '/3', -1) as telefone FROM cdr where cdr.dst = 'A' and disposition = 'ANSWERED'
            and cast(calldatestart as date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d')
            and cast(calldatestart as date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')
            and cdr.src like '%${req.body['ramal']}%'
            and SUBSTRING_INDEX(lastdata, '/3', -1) like '%${req.body['telefone']}%'

    union 
    select cdr.uniqueid as id, SUBSTR(SUBSTRING_INDEX(cdr.dstchannel, '/', -1), 1, 4)  as ramal, DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
        'Chamada Recebida' as modo, 
        cdr.src as telefone FROM cdr where cdr.lastapp = 'Queue' and disposition = 'ANSWERED'
            and cast(calldatestart as date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d')
            and cast(calldatestart as date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')
            and SUBSTR(SUBSTRING_INDEX(cdr.dstchannel, '/', -1), 1, 4) like '%${req.body['ramal']}%'
            and cdr.src like '%${req.body['telefone']}%'
    union
    
    select cdr.uniqueid as id, SUBSTR(SUBSTRING_INDEX(cdr.dstchannel, '/', -1), 1, 4)  as ramal, DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
    'Chamada Interna ou Transferida' as modo, 
    cdr.src as telefone FROM cdr where cdr.dst != 'A' and disposition = 'ANSWERED' and cdr.lastapp = 'Dial'
        and cast(calldatestart as date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d')
        and cast(calldatestart as date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')
        and SUBSTR(SUBSTRING_INDEX(cdr.dstchannel, '/', -1), 1, 4) like '%${req.body['ramal']}%'
        and cdr.src like '%${req.body['telefone']}%') k order by k.data_ligacao desc`;
        conn.query(qry, (erro, resultado)=> {
            conn.release();
            if(erro){
                console.log(erro)
                res.status(400).send(erro)
            }else{
               
                res.status(200).send(resultado);
            }
        
        })
        })
 }






exports.getSolicitacoesGravacoes= async(req, res, next)=>{         
    const query = `SELECT
    CASE
    
        WHEN
            atendimento.data_fechamento IS NOT NULL 
            AND ( 
            (   ( atendimento.data_fechamento - atendimento.data_cadastro ) < '2 days' :: INTERVAL ) 
             OR ( EXTRACT ( DOW FROM atendimento.data_cadastro ) = 4 AND ( atendimento.data_fechamento - atendimento.data_cadastro ) < '4 days' :: INTERVAL ) 
            OR ( EXTRACT ( DOW FROM atendimento.data_cadastro ) = 5 AND ( atendimento.data_fechamento - atendimento.data_cadastro ) < '3 days' :: INTERVAL )
        ) THEN 'Atendidas no Prazo' 
        WHEN atendimento.data_fechamento IS NULL THEN
        'Ainda não Atendidas' 
        ELSE 'Atendidas fora do Prazo' 
        END AS status,
        atendimento.protocolo,
        to_char( atendimento.data_cadastro, 'dd/mm/YYYY HH24:ii:ss' ) AS data_abertura,
        users."name" AS usuario_abertura,
        to_char( atendimento.data_fechamento, 'dd/mm/YYYY HH24:ii:ss' ) AS data_fechamento,
        atendimento.descricao_fechamento 
    FROM
        "atendimento"
        INNER JOIN users ON users.ID = atendimento.id_usuario_abertura 
    WHERE
        atendimento.id_tipo_atendimento = 305 and
      atendimento.data_cadastro::Date >= '${req.body['data_inicial']}' and  atendimento.data_cadastro::Date<= '${req.body['data_final']}';`;
      
    try{
        console.log(query)
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            console.log(erro)
            res.status(400).send(erro)
        }
   }

   exports.getLigacoesRealizadasQualidade= (req,res, next)=>{

    conexaoMysql.getConnection((error, conn)=>{
    const qry =     `select k.ramal, k.data_ligacao, k.resposta,  k.telefone, k.gravacao from (select ramal.nome as ramal, cdr.src as numero,  DATE_FORMAT(calldatestart,'%d/%m/%Y %H:%i:%s') as data_ligacao,
    case 
    when disposition = 'ANSWERED' then 'Atendida'
    else 'Não Atendida'
    end as resposta, 
    SUBSTRING_INDEX(lastdata, '/3', -1) as telefone, cdr.uniqueid as gravacao FROM cdr
    inner join ramal on cdr.src = ramal.numero 
    where cdr.disposition = 'ANSWERED' and TIMESTAMPDIFF(SECOND, cdr.calldateanswer, cdr.calldateend) >=20 and cdr.dst = 'A' and CAST(calldatestart AS date) >= date_format(str_to_date('${req.body['data_inicial']}', '%m/%d/%Y'), '%Y-%m-%d') and  CAST(calldatestart AS date) <= date_format(str_to_date('${req.body['data_final']}', '%m/%d/%Y'), '%Y-%m-%d')) as k
    where k.numero in ('2018','2057', '2061')`;
    conn.query(qry, (erro, resultado)=> {
        conn.release();
        if(erro){
            console.log(erro)
            res.status(400).send(erro)
        }else{
           
            res.status(200).send(resultado);
        }
    
    })
    })
 }