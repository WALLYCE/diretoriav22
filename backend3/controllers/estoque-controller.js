const conexao = require("../databases/conexao")
const cidades_case = require('../controllers/cidades_base')

exports.getCompras = async(req, res, next)=>{
         
    const query = `SELECT
    produto.nome,
    cast(produto_compra_produto.quantidade as INTEGER) as quantidade,
    unidade_medida.abreviacao,
    to_char(produto_compra.data_compra, 'DD/MM/YYYY') as data_compra,
    to_char(produto_compra_produto.data_cadastro,'DD/MM/YYYY') as data_cadastro,
    produto_compra_produto.valor_unitario,
    produto_compra_produto.valor_total,
    produto_compra.id_produto_compra,
    status_compra.descricao as status,
    produto_compra.codigo_compra,
    produto_compra_produto.id_produto,
    produto_compra_produto.id_local_estoque,
    case when produto.agrupado = true then 'Sim' else 'Não' end as agrupado,
    produto_compra_produto.id_produto_compra_produto
    FROM
        produto
        INNER JOIN produto_compra_produto ON produto.id_produto = produto_compra_produto.id_produto
        INNER JOIN produto_compra ON produto_compra_produto.id_produto_compra = produto_compra.id_produto_compra
        inner join unidade_medida on produto.id_unidade_medida = unidade_medida.id_unidade_medida
        inner join status_compra on status_compra.id_status_compra = produto_compra.id_status_compra
        where produto_compra.data_compra::date >= '${req.body['data_inicial']}' and produto_compra.data_compra::date <='${req.body['data_final']}' order by produto_compra.codigo_compra desc`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            console.log(erro)
            res.status(400).send(erro)
        }
 }

 exports.getProdutoCompraNaoAgrupadoEstoque= async(req, res, next)=>{
         
    const query = `SELECT
	produto.nome,
	produto_item.numero_serie,
	produto_item.codigo_item as id,
	local_estoque.descricao 
FROM
	produto
	INNER JOIN produto_item ON produto.id_produto = produto_item.id_produto
	INNER JOIN local_estoque ON produto_item.id_local_estoque = local_estoque.id_local_estoque 
WHERE
	produto_item.id_produto_compra = ${req.body['id_produto_compra']} 
	AND produto.id_produto =  ${req.body['id_produto']} 
	AND produto_item.id_produto_item_status = 5;`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            console.log(erro)
            res.status(400).send(erro)
        }
 }

 exports.getProdutoCompraNaoAgrupadoComodato= async(req, res, next)=>{
         
    const query = `SELECT
	produto.nome,
	produto_item.numero_serie,
	produto_item.codigo_item as id,
	cliente.nome_razaosocial,
	servico_status.descricao
FROM
	produto
	INNER JOIN produto_item ON produto.id_produto = produto_item.id_produto
	INNER JOIN cliente_servico_produto_item on cliente_servico_produto_item.id_produto_item = produto_item.id_produto_item
	inner join cliente_servico on cliente_servico.id_cliente_servico = cliente_servico_produto_item.id_cliente_servico
	inner join cliente on cliente.id_cliente = cliente_servico.id_cliente
	inner join servico_status on cliente_servico.id_servico_status = servico_status.id_servico_status
WHERE
	produto_item.id_produto_compra = ${req.body['id_produto_compra']} 
	AND produto.id_produto =  ${req.body['id_produto']} 
	AND produto_item.id_produto_item_status = 7;`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            console.log(erro)
            res.status(400).send(erro)
        }
 }

 exports.getProdutoCompraNaoAgrupadoUsuario= async(req, res, next)=>{
         
    const query = `SELECT
	produto.nome,
	produto_item.numero_serie,
	produto_item.codigo_item as id,
	users."name"
FROM
	produto
	INNER JOIN produto_item ON produto.id_produto = produto_item.id_produto
  inner join produto_item_usuario on produto_item.id_produto_item = produto_item_usuario.id_produto_item
	inner join users on users.id = produto_item_usuario.id_usuario
WHERE
	produto_item.id_produto_compra = ${req.body['id_produto_compra']} 
	AND produto.id_produto =  ${req.body['id_produto']} 
	AND produto_item.id_produto_item_status = 14;`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            console.log(erro)
            res.status(400).send(erro)
        }
 }


 exports.getProdutoCompraNaoAgrupadoPerdido= async(req, res, next)=>{
         
    const query = `SELECT
	produto.nome,
	produto_item.numero_serie,
	produto_item.codigo_item as id
FROM
	produto
	INNER JOIN produto_item ON produto.id_produto = produto_item.id_produto
WHERE
	produto_item.id_produto_compra = ${req.body['id_produto_compra']} 
	AND produto.id_produto =  ${req.body['id_produto']} 
	AND produto_item.id_produto_item_status = 8;`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            console.log(erro)
            res.status(400).send(erro)
        }
 }

 exports.getProdutoCompraNaoAgrupadoOutros= async(req, res, next)=>{
         
    const query = `SELECT
	produto.nome,
	produto_item.numero_serie,
	produto_item.codigo_item as id,
    produto_item_status.descricao
FROM
	produto
	INNER JOIN produto_item ON produto.id_produto = produto_item.id_produto
	inner join produto_item_status on produto_item_status.id_produto_item_status = produto_item.id_produto_item_status
WHERE
	produto_item.id_produto_compra = ${req.body['id_produto_compra']} 
	AND produto.id_produto =  ${req.body['id_produto']} 
    AND produto_item.id_produto_item_status not in (5,7,8,14);`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            console.log(erro)
            res.status(400).send(erro)
        }
 }