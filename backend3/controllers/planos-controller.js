
const conexao = require("../databases/conexao")
const cidades_case = require('../controllers/cidades_base')
const quantidade_clientes_plano_cidade_base = ` SELECT k.cidade,
count(*) AS quantidade,
k.plano,
k.valor
FROM ( SELECT servico.descricao AS plano,
        servico.valor,
            CASE
              ${cidades_case}
            END AS cidade
       FROM cliente_servico
         JOIN cliente_servico_endereco ON cliente_servico.id_cliente_servico = cliente_servico_endereco.id_cliente_servico
         JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
         JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
         JOIN servico_status ON servico_status.id_servico_status = cliente_servico.id_servico_status
         JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
         JOIN servico ON servico.id_servico = cliente_servico.id_servico
      WHERE (servico_status.id_servico_status = 11 OR servico_status.id_servico_status = 12 OR servico_status.id_servico_status = 14) AND cliente_servico_endereco.tipo::text = 'instalacao'::text AND cliente.nome_razaosocial::text !~~ '%TESTE%'::text AND cliente.nome_razaosocial::text !~~ '%ESERV%'::text AND cliente.nome_razaosocial::text !~~ '%RICARDO JOSE OLIVEIRA NEVES%'::text AND cliente.tipo_pessoa::text = 'pf'::text) k
GROUP BY k.plano, k.valor, k.cidade`
exports.getPlanosAtivosCidade =  async(req, res, next)=>{       
    const query = `select * from (${quantidade_clientes_plano_cidade_base}) as j where j.cidade = '${req.body['cidade']}'`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
    
   }