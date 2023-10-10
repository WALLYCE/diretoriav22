
const conexao = require("../databases/conexao")
const cidades_case = require('../controllers/cidades_base')
const upgrade_base = ` SELECT k.cod_cliente,
k.nome_cliente,
k.cidade,
k.vendedor,
k.plano,
k.valor,
k.descricao AS status,
k.data_contrato,
k.historico,
servico.descricao AS plano_antigo
FROM ( SELECT cliente.codigo_cliente AS cod_cliente,
        cliente.nome_razaosocial AS nome_cliente,
        users.name AS vendedor,
        servico_1.descricao AS plano,
        servico_status.descricao,
        servico_1.valor,
        cliente_historico.data_cadastro::date AS data_contrato,
        cs_antigo.id_servico AS id_servico_antigo,
        cliente_historico.historico,
            CASE
         ${cidades_case}
            END AS cidade
       FROM cliente_servico cs
         JOIN cliente_servico cs_antigo ON cs.id_cliente_servico_antigo = cs_antigo.id_cliente_servico
         JOIN cliente ON cliente.id_cliente = cs.id_cliente
         JOIN cliente_servico_endereco ON cliente_servico_endereco.id_cliente_servico = cs.id_cliente_servico
         JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
         JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
         JOIN users ON users.id = cs.id_usuario_vendedor
         JOIN servico servico_1 ON servico_1.id_servico = cs.id_servico
         JOIN cliente_historico ON cliente_historico.id_cliente = cliente.id_cliente
         JOIN servico_status ON servico_status.id_servico_status = cs.id_servico_status
      WHERE (cs.id_motivo_cancelamento IS NULL OR cs.id_motivo_cancelamento <> 47 AND cs.id_motivo_cancelamento <> 24 AND cs.id_motivo_cancelamento <> 29 AND cs.id_motivo_cancelamento <> 14) AND cs.id_servico_tecnologia = cs_antigo.id_servico_tecnologia AND cs.origem::text = 'migrado'::text AND cliente_servico_endereco.tipo::text = 'instalacao'::text AND users.name::text <> 'Teste T.I'::text AND cliente_historico.historico ~~ '%Status do Serviço: Aguardando Migração%'::text AND cliente_historico.historico ~~ concat('%', servico_1.descricao, '%') AND cliente_historico.historico ~~ concat('%(', cs.numero_plano, ')%')) k
 JOIN servico ON k.id_servico_antigo = servico.id_servico
ORDER BY k.data_contrato`
exports.getUpgradeCidade =  async(req, res, next)=>{       
    const query = `Select k.cidade as Cidade,
       k.cod_cliente as Codigo, 
       k.nome_cliente as Nome, 
       to_char(k.data_contrato, 'DD/MM/YYYY') as data, 
       k.vendedor as Vendedor, 
       k.plano as Plano,k.status, 
       k.valor as Valor, 
       k.plano_antigo as "Plano(Anterior)"  from (${upgrade_base}) as k where k.data_contrato>= '${req.body['data_inicial']}' and k.data_contrato <= '${req.body['data_final']}';`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
    
   }


exports.getUpgradeVendedores = async(req, res, next)=>{      
      const query = `Select k.vendedor as Vendedor, 
      k.cod_cliente as Codigo, 
      k.nome_cliente as Nome, 
       to_char(k.data_contrato, 'DD/MM/YYYY') as data, 
       k.cidade as Cidade, 
       k.plano as Plano, 
       k.valor as Valor, 
       k.plano_antigo as "Plano(Anterior)"  from (${upgrade_base}) as k where k.data_contrato>= '${req.body['data_inicial']}' and k.data_contrato<= '${req.body['data_final']}';`;
      try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            console.log(erro)
            res.status(400).send(erro)
        }
    
     }