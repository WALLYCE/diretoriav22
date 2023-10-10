const conexao = require('../databases/conexao');
const  conexaoMysql = require('../databases/conexao_mysql').pool
const cidades_case = require('../controllers/cidades_base')
const vendas_base= `SELECT DISTINCT
cliente_servico.id_cliente_servico,
cliente_servico.id_cliente,
cliente_servico.data_venda :: DATE AS data_venda,
cliente.nome_razaosocial AS nome_cliente,
cliente.codigo_cliente,
users.NAME AS vendedor,
servico.descricao AS plano,
servico.valor,
servico_status.descricao,
motivo_cancelamento.descricao AS descricao_cancelamento,
cliente_servico.id_servico_status,
cliente.tipo_pessoa,
servico_status.descricao AS servico_status,
users.ID AS id_vendedor,
CASE
    ${cidades_case}
                                                                    END AS cidade,
                                                                cliente_historico.historico 
                                                            FROM
                                                                cliente_servico
                                                                JOIN cliente_servico_endereco ON cliente_servico.id_cliente_servico = cliente_servico_endereco.id_cliente_servico
                                                                JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
                                                                JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
                                                                JOIN users ON users.ID = cliente_servico.id_usuario_vendedor
                                                                JOIN servico ON servico.id_servico = cliente_servico.id_servico
                                                                JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
                                                                JOIN servico_status ON servico_status.id_servico_status = cliente_servico.id_servico_status
                                                                LEFT JOIN motivo_cancelamento ON motivo_cancelamento.id_motivo_cancelamento = cliente_servico.id_motivo_cancelamento
                                                                JOIN cliente_historico ON cliente_historico.id_cliente = cliente.id_cliente 
                                                            WHERE
                                                                cliente_servico_endereco.tipo :: TEXT = 'instalacao' :: TEXT 
                                                                AND (
                                                                    cliente_servico.origem :: TEXT = 'novo' :: TEXT 
                                                                    OR cliente_servico.id_cliente_servico = 60089 
                                                                    OR cliente_servico.id_cliente_servico = 59643 
                                                                    OR cliente_servico.id_cliente_servico = 59669 
                                                                    OR cliente_servico.id_cliente_servico = 59888 
                                                                    OR cliente_servico.id_cliente_servico = 59659 
                                                                    OR cliente_servico.id_cliente_servico = 60234 
                                                                    OR cliente_servico.id_cliente_servico = 59791 
                                                                    OR cliente_servico.id_cliente_servico = 59711 
                                                                    OR cliente_servico.id_cliente_servico = 60117 
                                                                    OR cliente_servico.id_cliente_servico = 59708 
                                                                    OR cliente_servico.id_cliente_servico = 60035 
                                                                    OR cliente_servico.id_cliente_servico = 59777 
                                                                    OR cliente_servico.id_cliente_servico = 59734 
                                                                    OR cliente_servico.id_cliente_servico = 60316 
                                                                    OR cliente_servico.id_cliente_servico = 60261 
                                                                    OR cliente_servico.id_cliente_servico = 60127 
                                                                    OR cliente_servico.id_cliente_servico = 60279 
                                                                    OR cliente_servico.id_cliente_servico = 60350 
                                                                    OR cliente_servico.id_cliente_servico = 59676 
                                                                    OR cliente_servico.id_cliente_servico = 60274 
                                                                    OR cliente_servico.id_cliente_servico = 59754 
                                                                    OR cliente_servico.id_cliente_servico = 60024 
                                                                    OR cliente_servico.id_cliente_servico = 60094 
                                                                    OR cliente_servico.id_cliente_servico = 59713 
                                                                    OR cliente_servico.id_cliente_servico = 60038 
                                                                    OR cliente_servico.id_cliente_servico = 59680 
                                                                    OR cliente_servico.id_cliente_servico = 59609 
                                                                    OR cliente_servico.id_cliente_servico = 59992 
                                                                    OR cliente_servico.id_cliente_servico = 59640 
                                                                    OR cliente_servico.id_cliente_servico = 60314 
                                                                    OR cliente_servico.id_cliente_servico = 59605 
                                                                    OR cliente_servico.id_cliente_servico = 59840 
                                                                    OR cliente_servico.id_cliente_servico = 59788 
                                                                    OR cliente_servico.id_cliente_servico = 60056 
                                                                    OR cliente_servico.id_cliente_servico = 60147 
                                                                    OR cliente_servico.id_cliente_servico = 60297 
                                                                    OR cliente_servico.id_cliente_servico = 59797 
                                                                    OR cliente_servico.id_cliente_servico = 60157 
                                                                    OR cliente_servico.id_cliente_servico = 60318 
                                                                    OR cliente_servico.id_cliente_servico = 59814 
                                                                    OR cliente_servico.id_cliente_servico = 60118 
                                                                    OR cliente_servico.id_cliente_servico = 60320 
                                                                    OR cliente_servico.id_cliente_servico = 60340 
                                                                    OR cliente_servico.id_cliente_servico = 60209 
                                                                    OR cliente_servico.id_cliente_servico = 60204 
                                                                    OR cliente_servico.id_cliente_servico = 59778 
                                                                    OR cliente_servico.id_cliente_servico = 60148 
                                                                    OR cliente_servico.id_cliente_servico = 60319 
                                                                    OR cliente_servico.id_cliente_servico = 60265 
                                                                    OR cliente_servico.id_cliente_servico = 60155 
                                                                    OR cliente_servico.id_cliente_servico = 60086 
                                                                    OR cliente_servico.id_cliente_servico = 60373 
                                                                    OR cliente_servico.id_cliente_servico = 60284 
                                                                    OR cliente_servico.id_cliente_servico = 60273 
                                                                    OR cliente_servico.id_cliente_servico = 59824 
                                                                    OR cliente_servico.id_cliente_servico = 59789 
                                                                    OR cliente_servico.id_cliente_servico = 60032 
                                                                    OR cliente_servico.id_cliente_servico = 59804 
                                                                    OR cliente_servico.id_cliente_servico = 60334 
                                                                    OR cliente_servico.id_cliente_servico = 60145 
                                                                    OR cliente_servico.id_cliente_servico = 60234 
                                                                ) 
                                                                AND users.NAME :: TEXT !~~* '%Teste T.I%' :: TEXT 
                                                                AND users.NAME :: TEXT !~~* '%CONTRATOS%' :: TEXT 
                                                                AND cliente_servico.id_servico_status <> 64 
                                                                AND (
                                                                    cliente_servico.id_motivo_cancelamento IS NULL 
                                                                    OR cliente_servico.id_motivo_cancelamento <> 47 
                                                                    AND cliente_servico.id_motivo_cancelamento <> 24 
                                                                    AND cliente_servico.id_motivo_cancelamento <> 29 
                                                                    AND cliente_servico.id_motivo_cancelamento <> 14 
                                                                    AND motivo_cancelamento.descricao :: TEXT <> 'Mudança de Serviço' :: TEXT 
                                                                ) 
                                                                AND users.NAME :: TEXT <> 'RODRIGO' :: TEXT 
                                                                AND cliente.nome_razaosocial :: TEXT !~~ '%ESERV%' :: TEXT 
                                                            AND cliente.nome_razaosocial :: TEXT !~~ '%RICARDO JOSE OLIVEIRA NEVES%' :: TEXT 
AND cliente_historico.historico ~~ concat ( '%Dados do Serviço (', cliente_servico.numero_plano, '%' )`




exports.getVendaPorCidade = async(req, res, next)=>{
    const query = `Select k.cidade as Cidade,
     k.codigo_cliente as Codigo, 
     k.nome_cliente as Nome,  
     to_char(k.data_venda, 'DD/MM/YYYY') as data, 
     k.vendedor as Vendedor, 
     k.plano as Plano,
     k.valor as Valor,
     k.descricao as Status  from (${vendas_base}) as k where k.data_venda>= '${req.body['data_inicial']}' and k.data_venda<= '${req.body['data_final']}';`;
    
    try{
    const resposta = await conexao.query(query);
    res.status(200).send(resposta.rows)
    }catch(erro){
        res.status(400).send(erro)
    }

}

exports.getVendaPorCidadeTotal = async(req, res, next)=>{
    const query = `Select k.cidade as Cidade, count(*) as quantidade  from (${vendas_base}) as k where k.data_venda>= '${req.body['data_inicial']}' and k.data_venda<= '${req.body['data_final']}' group by k.cidade;`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
   }

exports.getVendasPorPeriodo = async(req, res, next)=>{
    var query ='';
    if(req.body['Local'] == 'Geral'){
        query = `SELECT date_part('year', vendas.data_venda) as ano,
          date_part('month', vendas.data_venda) as mes,
           count(*) as vendas_realizadas , 
           sum(case when vendas.descricao = 'Cancelado' then 1 else 0 end) as  cancelados_suspensos FROM (${vendas_base}) as vendas
            where vendas.data_venda>= '2021/09/01' GROUP BY date_part('year', vendas.data_venda),  date_part('month', vendas.data_venda)`                 
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
    }else{

        query = `SELECT date_part('year', vendas.data_venda) as ano,  
        date_part('month', vendas.data_venda) as mes,
         count(*) as vendas_realizadas , 
         sum(case when vendas.descricao = 'Cancelado' then 1 else 0 end) as  cancelados_suspensos
          FROM (${vendas_base}) as vendas where vendas.data_venda>= '2021/09/01' and vendas.cidade = '${req.body['Local']}' GROUP BY date_part('year', vendas.data_venda),  date_part('month', vendas.data_venda)`
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
    }
  
 }


 exports.getVendasPorVendedores = async(req, res, next)=>{
    const query = `Select k.vendedor as Vendedor, 
    k.codigo_cliente as Codigo, 
    k.nome_cliente as Nome,  
    to_char(k.data_venda, 'DD/MM/YYYY') as data,
    k.cidade as Cidade, k.plano as Plano, 
    k.valor as Valor, k.descricao as status  
    from (${vendas_base}) as k where k.data_venda>= '${req.body['data_inicial']}' and k.data_venda<= '${req.body['data_final']}' order by k.vendedor;`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
   }

   exports.getVendedoresAtivos= async(req, res, next)=>{
    const query = `Select * from vendedores`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
}


exports.getVendasTipo= async(req, res, next)=>{
 
    const query = `Select count(*) as quantidade,
     k.tipo_pessoa from (${vendas_base}) as k where k.data_venda>= '${req.body['data_inicial']}' and k.data_venda<= '${req.body['data_final']}' Group By k.tipo_pessoa;`;

    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
 }

 exports.getMetasCidade= async(req, res, next)=>{
    const query = ` SELECT DISTINCT upper(cidade.nome)
                    FROM cliente_servico
                    JOIN cliente_servico_endereco ON cliente_servico_endereco.id_cliente_servico = cliente_servico.id_cliente_servico
                    JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
                    JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
                    WHERE cliente_servico_endereco.tipo::text = 'instalacao'::text AND cliente_servico.id_servico_status = 11 AND cidade.nome::text <> 'São Paulo'::text
                    ORDER BY cidade.nome`;
    conexao.query(query, (erro, resposta)=>{
        if(erro){console.log(erro)}
        else{
            conexaoMysql.getConnection((error, conn)=>{
            const sql = `Select * from cidade_meta_vendas`

                conn.query(sql, (erro, resultado)=>{
                    if(erro){
                        console.log(erro)
                    }else{
                        for(var i = 0; i< resposta.rows.length; i++){
                            const index = resultado.findIndex((obj) => obj.cidade_nome ==resposta.rows[i]['nome'])
                            if(index == -1){
                                const insere = `INSERT INTO cidade_meta_vendas(cidade_nome, meta_vendas) VALUES ('${resposta.rows[i]['nome']}', 0)`;
                                conn.query(insere, (err, result)=>{
                                    if(err){console.log(err)}
                                    else{
                                        console.log('cidade inserida com sucesso')
                                    }
                                })
                            }
                       
                        
                         
                        }
                    }
                    
                    conn.release();
                })
                
                })
        }
        
    })

    conexaoMysql.getConnection((error, conn)=>{
    const qry =     `SELECT * FROM cidade_meta_vendas`;
    conn.query(qry, (erro, resultado)=> {
        conn.release();
        if(erro){
           
        }else{
            res.status(200).send(resultado)
        }
      
    })

    })
 }



 exports.updateMetas = async(req, res, next)=>{
    
    conexaoMysql.getConnection((error, conn)=>{

        Dados['newMetas'].map((item)=>{
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
     res.status(200).send('Metas Atualizadas')
 }

 exports.getVendasPorPeriodo = async(req, res, next)=>{
    var query ='';
    if(req.body['Local'] == 'Geral'){
        query = `SELECT date_part('year', vendas.data_venda) as ano,  
        date_part('month', vendas.data_venda) as mes, 
        count(*) as vendas_realizadas ,
         sum(case when vendas.descricao = 'Cancelado' then 1 else 0 end) as  cancelados_suspensos 
         FROM (${vendas_base}) as vendas where vendas.data_venda>= '2021/09/01' GROUP BY date_part('year', vendas.data_venda),  date_part('month', vendas.data_venda)`                 
        const resposta = await conexao.query(query);
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
    }else{
        query = `SELECT date_part('year', vendas.data_venda) as ano,  
        date_part('month', vendas.data_venda) as mes, 
        count(*) as vendas_realizadas , sum(case when vendas.descricao = 'Cancelado' then 1 else 0 end) as  cancelados_suspensos
         FROM (${vendas_base}) as vendas where vendas.data_venda>= '2021/09/01' and vendas.cidade = '${req.body['Local']}' GROUP BY date_part('year', vendas.data_venda),  date_part('month', vendas.data_venda)`
        const resposta = await conexao.query(query);
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
    }
  
 }


 exports.getVendasPorSetor = async(req, res, next)=>{
const query = `Select k.setor as Setor, 
k.codigo_cliente as Codigo,
k.nome_cliente as Nome,  
to_char(k.data_venda, 'DD/MM/YYYY') as data,
k.vendedor as Vendedor, plano as Plano,
k.valor as Valor, 
k.cidade as cidade,
k.descricao as status from ( SELECT vendas.id_cliente,
        vendas.data_venda,
        vendas.nome_cliente,
        vendas.codigo_cliente,
        vendas.cidade,
        vendas.vendedor,
        vendas.plano,
        vendas.valor,
        vendas.descricao,
        setor.descricao AS setor
       FROM (${vendas_base}) as vendas
         JOIN usuario_setor ON vendas.id_vendedor = usuario_setor.id_usuario
         JOIN setor ON setor.id_setor = usuario_setor.id_setor
      WHERE setor.descricao::text = ' Vendas'::text OR setor.descricao::text = 'Vendas Externo'::text OR setor.descricao::text = 'Vendas Terceirizada'::text) as k where k.data_venda>= '${req.body['data_inicial']}' and k.data_venda<= '${req.body['data_final']}'`;
 
 try{
    const resposta = await conexao.query(query);
    res.status(200).send(resposta.rows)
    }catch(erro){
        console.log(erro)
        res.status(400).send(erro)
    }

}