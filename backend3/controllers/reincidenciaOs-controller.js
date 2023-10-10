const conexao = require("../databases/conexao")
const cidades_case = require('../controllers/cidades_base')
const reincidencia_os_base = ` SELECT cliente.codigo_cliente AS cod_cliente,
    cliente.nome_razaosocial AS nome_cliente,
    servico.descricao AS plano,
    tipo_ordem_servico.descricao AS tipo_os,
    cliente_servico.id_cliente_servico,
    ordem_servico.data_cadastro,
        CASE
           ${cidades_case}
        END AS cidade,
    servico_status.descricao AS status
   FROM ordem_servico
     JOIN tipo_ordem_servico ON ordem_servico.id_tipo_ordem_servico = tipo_ordem_servico.id_tipo_ordem_servico
     JOIN cliente_servico ON ordem_servico.id_cliente_servico = cliente_servico.id_cliente_servico
     JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
     JOIN servico ON cliente_servico.id_servico = servico.id_servico
     JOIN cliente_servico_endereco ON cliente_servico_endereco.id_cliente_servico = cliente_servico.id_cliente_servico
     JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
     JOIN servico_status ON servico_status.id_servico_status = cliente_servico.id_servico_status
     JOIN cidade ON cidade.id_cidade = endereco_numero.id_cidade
  WHERE cliente_servico_endereco.tipo::text = 'instalacao'::text AND (cliente_servico.id_servico_status = 11 OR cliente_servico.id_servico_status = 12 OR cliente_servico.id_servico_status = 14 OR cliente_servico.id_servico_status = 9 AND cliente.ativo = false) AND (tipo_ordem_servico.descricao::text = 'SEM ACESSO (FIBRA)'::text OR tipo_ordem_servico.descricao::text = 'ACESSO CAINDO (RADIO)'::text OR tipo_ordem_servico.descricao::text = 'RELIGAMENTO'::text OR tipo_ordem_servico.descricao::text = 'MUDANÇA DE ENDEREÇO (FIBRA)'::text OR tipo_ordem_servico.descricao::text = 'ACESSO LENTO (FIBRA)'::text OR tipo_ordem_servico.descricao::text = 'SEM ACESSO (RADIO)'::text OR tipo_ordem_servico.descricao::text = 'ACESSO CAINDO (FIBRA)'::text OR tipo_ordem_servico.descricao::text = 'CONFIGURAR SERVIÇO'::text OR tipo_ordem_servico.descricao::text = 'MANUTENÇÃO HDTV'::text OR tipo_ordem_servico.descricao::text = 'PROJETO CLIENTE FIBRA'::text)`
exports.getRencidiencia_os= async(req, res, next)=>{ 
    const query = `Select  k.cod_cliente as "codigo",
     k.nome_cliente as nome, 
     k.plano, 
     k.tipo_os as tipo,
     k.cidade as Cidade, 
     count(*) as quantidade, 
    k.status from (${reincidencia_os_base}) as k where k.data_cadastro::date >='${req.body['data_inicial']}' and k.data_cadastro::date<='${req.body['data_final']}'  Group By (cod_cliente, nome_cliente, plano, tipo_os, status, cidade) HAVING count(*) >=${req.body['minimo']} order by quantidade DESC`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }

}