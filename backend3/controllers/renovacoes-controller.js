
const conexao = require('../databases/conexao');
const cidades_case = require('../controllers/cidades_base')
const renovacoes_base = ` SELECT k.cod_cliente,
k.nome_cliente,
k.cidade,
k.vendedor,
k.plano,
k.valor,
k.descricao AS status,
k.data_contrato,
k.historico
FROM ( SELECT DISTINCT
            CASE
               ${cidades_case}
            END AS cidade,
        cliente.codigo_cliente AS cod_cliente,
        cliente.nome_razaosocial AS nome_cliente,
        users.name AS vendedor,
        servico_1.descricao AS plano,
        servico_status.descricao,
        servico_1.valor,
        cliente_historico.data_cadastro::date AS data_contrato,
        cliente_historico.historico,
        cs.id_cliente_servico
       FROM cliente_servico cs
         JOIN cliente ON cliente.id_cliente = cs.id_cliente
         JOIN cliente_servico_endereco ON cliente_servico_endereco.id_cliente_servico = cs.id_cliente_servico
         JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
         JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
         JOIN users ON users.id = cs.id_usuario_vendedor
         JOIN servico servico_1 ON servico_1.id_servico = cs.id_servico
         JOIN cliente_historico ON cliente_historico.id_cliente = cliente.id_cliente
         JOIN servico_status ON servico_status.id_servico_status = cs.id_servico_status
      WHERE cliente_servico_endereco.tipo::text = 'instalacao'::text AND users.name::text <> 'Teste T.I'::text AND cliente_historico.historico ~~ concat('%(', cs.numero_plano, ') ', servico_1.descricao, ') foi renovado manualmente. Nova data de renovação:', '%') AND cliente.nome_razaosocial::text !~~ '%ESERV%'::text AND cliente.nome_razaosocial::text !~~ '%TESTE%'::text AND cliente.nome_razaosocial::text !~~ '%RICARDO JOSE OLIVEIRA NEVES%'::text) k
ORDER BY k.data_contrato`

exports.getRenovacoesCidade= async(req, res, next)=>{       
        const query = `Select k.cidade as Cidade, 
        k.cod_cliente as Codigo, 
        k.nome_cliente as Nome,  
        to_char(k.data_contrato, 'DD/MM/YYYY') as data, 
        k.vendedor as Vendedor, 
        k.plano as Plano, 
        k.valor as Valor from (${renovacoes_base}) as k where k.data_contrato>= '${req.body['data_inicial']}' and k.data_contrato<= '${req.body['data_final']}';`;
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                console.log(erro)
                res.status(400).send(erro)
            }
       }

exports.getRenovacoesVendedor = async(req, res, next)=>{      
        const query = `Select k.vendedor as vendedor, 
        k.cod_cliente as Codigo, 
        k.nome_cliente as Nome,  to_char(k.data_contrato, 'DD/MM/YYYY') as data, k.cidade as Cidade, k.plano as Plano, k.valor as Valor from (${renovacoes_base}) as k  where k.data_contrato>= '${req.body['data_inicial']}' and k.data_contrato<= '${req.body['data_final']}';`;
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
       }
