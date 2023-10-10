const conexao = require('../databases/conexao');
const cidades_case = require('../controllers/cidades_base')
const cancelamentos_base = `SELECT DISTINCT
cliente_servico.data_cancelamento,
motivo_cancelamento.descricao AS motivo_cancelamento,
cliente_servico.id_servico_tecnologia,
cliente_servico.id_cliente_servico,
cliente.codigo_cliente,
cliente.nome_razaosocial,
cliente.tipo_pessoa,
servico.descricao AS plano,
CASE
  ${cidades_case}
         END AS cidade 
                                                            FROM
                                                                cliente_servico
                                                                JOIN cliente_servico_endereco ON cliente_servico.id_cliente_servico = cliente_servico_endereco.id_cliente_servico
                                                                JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
                                                                JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
                                                                JOIN motivo_cancelamento ON cliente_servico.id_motivo_cancelamento = motivo_cancelamento.id_motivo_cancelamento
                                                                JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
                                                                JOIN servico ON servico.id_servico = cliente_servico.id_servico 
                                                            WHERE
                                                                cliente_servico.id_motivo_cancelamento IS NOT NULL 
                                                                AND cliente_servico.id_motivo_cancelamento <> 24 
                                                                AND cliente_servico.id_motivo_cancelamento <> 47 
                                                                AND cliente_servico.id_motivo_cancelamento <> 18 
                                                                AND cliente_servico.id_motivo_cancelamento <> 21 
                                                                AND cliente_servico.id_motivo_cancelamento <> 14 
                                                                AND cliente_servico.id_motivo_cancelamento <> 29 
                                                                AND cliente_servico.id_motivo_cancelamento <> 69 
                                                                AND cliente_servico.id_motivo_cancelamento <> 39 
                                                                AND cliente_servico.id_motivo_cancelamento <> 51 
                                                                AND cliente_servico.id_motivo_cancelamento <> 52 
                                                                AND cliente_servico.id_motivo_cancelamento <> 25 
                                                                AND cliente_servico.id_motivo_cancelamento <> 27 
                                                                AND cliente_servico.id_motivo_cancelamento <> 19 
                                                                AND cliente_servico.id_motivo_cancelamento <> 7 
                                                                AND cliente_servico.id_motivo_cancelamento <> 30 
                                                                AND cliente_servico.id_motivo_cancelamento <> 53 
                                                                AND cliente_servico.id_motivo_cancelamento <> 49 
                                                                AND cliente_servico.id_motivo_cancelamento <> 50 
                                                                AND cliente_servico.id_motivo_cancelamento <> 11 
                                                                AND cliente_servico.id_motivo_cancelamento <> 13 
                                                                AND cliente_servico.id_motivo_cancelamento <> 16 
                                                                AND cliente_servico.id_motivo_cancelamento <> 5 
                                                                AND cliente_servico.id_motivo_cancelamento <> 20 
                                                                AND cliente_servico.id_motivo_cancelamento <> 28 
                                                                AND cliente_servico.id_motivo_cancelamento <> 3 
                                                                AND cliente_servico.id_motivo_cancelamento <> 92 
                                                                AND cliente_servico.id_motivo_cancelamento <> 91 
                                                            AND cliente_servico.id_motivo_cancelamento <> 93 
AND cliente_servico_endereco.tipo :: TEXT = 'instalacao' :: TEXT`


exports.getCancelamentosPorCidade = async(req,res,next)=>{
        const query = `Select k.cidade as Cidade,
         k.codigo_cliente as Codigo, 
         k.nome_razaosocial as Nome,
           to_char(k.data_cancelamento, 'DD/MM/YYYY') as data,
            k.plano as Plano,
            k.motivo_cancelamento as motivo 
            from (${cancelamentos_base}) as k where k.data_cancelamento>= '${req.body['data_inicial']}' and k.data_cancelamento<= '${req.body['data_final']}';`;
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
       }


exports.getCancelamentosTipo= async(req,res,next)=>{
         
        const query = `Select count(*) as quantidade,
         k.tipo_pessoa from (${cancelamentos_base}) where k.data_cancelamento>= '${req.body['data_inicial']}' and k.data_cancelamento<= '${req.body['data_final']}' Group By k.tipo_pessoa;`;
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
     }


exports.getCancelamentosPorPeriodo = async(req,res,next)=>{
        var query ='';
        if(req.body['Local'] == 'Geral'){
             query = `SELECT  date_part('year', cancelamentos.data_cancelamento) as ano,  date_part('month', cancelamentos.data_cancelamento) as mes, count(*) as quantidade FROM (${cancelamentos_base}) as cancelamentos where cancelamentos.data_cancelamento>= '2021/09/01' GROUP BY date_part('year', cancelamentos.data_cancelamento),  date_part('month', cancelamentos.data_cancelamento)`
        }else{
             query = `SELECT  date_part('year', cancelamentos.data_cancelamento) as ano,  date_part('month', cancelamentos.data_cancelamento) as mes, count(*) as quantidade FROM  (${cancelamentos_base}) as cancelamentos where cancelamentos.data_cancelamento>= '2021/09/01' and cancelamentos.cidade like '${req.body['Local']}' GROUP BY date_part('year', cancelamentos.data_cancelamento),  date_part('month', cancelamentos.data_cancelamento)`
        }
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
     }