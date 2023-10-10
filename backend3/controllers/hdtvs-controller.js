const conexao = require("../databases/conexao")
const cidades_case = require('../controllers/cidades_base')
const hdtv_base = ` SELECT cliente.codigo_cliente,
cliente.nome_razaosocial AS nome,
    CASE
    ${cidades_case}
    END AS cidade,
movimento_produto.data_movimento::date AS data_habilitacao,
cliente.tipo_pessoa
FROM cliente_servico
 JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
 JOIN cliente_servico_produto_item ON cliente_servico.id_cliente_servico = cliente_servico_produto_item.id_cliente_servico
 JOIN produto_item ON produto_item.id_produto_item = cliente_servico_produto_item.id_produto_item
 JOIN produto ON produto.id_produto = produto_item.id_produto
 JOIN cliente_endereco_numero ON cliente_endereco_numero.id_cliente = cliente.id_cliente
 JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_endereco_numero.id_endereco_numero
 JOIN cidade ON cidade.id_cidade = endereco_numero.id_cidade
 JOIN movimento_produto ON movimento_produto.id_movimento_produto = cliente_servico_produto_item.id_movimento_produto
WHERE (cliente_servico.id_servico_status = 11 OR cliente_servico.id_servico_status = 12 OR cliente_servico.id_servico_status = 14) AND (produto.id_produto = 472 OR produto.id_produto = 1222)`
exports.getHdtvTipo = async(req, res, next)=>{
         
    const query = `Select count(*) as quantidade, k.tipo_pessoa from (${hdtv}) as k Group By k.tipo_pessoa;`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
 }

exports.getHdtvCidade = async(req, res, next)=>{
     const query = `Select  k.cidade,
     k.codigo_cliente as codigo,
     k.nome,
       to_char(k.data_habilitacao::date::timestamp with time zone, 'dd/MM/YYYY'::text) AS data 
       from (${hdtv_base}) as k where k.data_habilitacao >= '${req.body['data_inicial']}' and k.data_habilitacao <= '${req.body['data_final']}';`;
     try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
 }