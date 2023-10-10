const conexao = require('../databases/conexao')
const cidades_case = require('../controllers/cidades_base')
const clientes_inativos_prospecto_base = ` SELECT DISTINCT s.id,
s.nome,
s.telefone,
s.telefone2,
s.cidade,
COALESCE(prospecto.id_prospecto, '-1'::integer) AS prospecto
FROM ( SELECT DISTINCT cliente.codigo_cliente AS id,
        cliente.nome_razaosocial AS nome,
            CASE
            ${cidades_case}
            END AS cidade,
        cliente.telefone_primario AS telefone,
        cliente.telefone_secundario AS telefone2
       FROM cliente_servico
         JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
         JOIN cliente_servico_endereco ON cliente_servico_endereco.id_cliente_servico = cliente_servico.id_cliente_servico
         JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
         JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
      WHERE (cliente_servico.data_cancelamento + '9 mons'::interval) <= now()::date AND cliente.ativo = false AND cliente.nome_razaosocial::text <> ''::text AND cliente_servico_endereco.tipo::text = 'instalacao'::text AND cliente.telefone_primario::text <> ''::text AND cliente_servico.id_motivo_cancelamento <> 24 AND cliente_servico.id_motivo_cancelamento <> 47 AND cliente_servico.id_motivo_cancelamento <> 18 AND cliente_servico.id_motivo_cancelamento <> 21 AND cliente_servico.id_motivo_cancelamento <> 14 AND cliente_servico.id_motivo_cancelamento <> 29 AND cliente_servico.id_motivo_cancelamento <> 69 AND cliente_servico.id_motivo_cancelamento <> 39 AND cliente_servico.id_motivo_cancelamento <> 51 AND cliente_servico.id_motivo_cancelamento <> 52 AND cliente_servico.id_motivo_cancelamento <> 25 AND cliente_servico.id_motivo_cancelamento <> 27 AND cliente_servico.id_motivo_cancelamento <> 19 AND cliente_servico.id_motivo_cancelamento <> 7 AND cliente_servico.id_motivo_cancelamento <> 30 AND cliente_servico.id_motivo_cancelamento <> 53 AND cliente_servico.id_motivo_cancelamento <> 49 AND cliente_servico.id_motivo_cancelamento <> 50 AND cliente_servico.id_motivo_cancelamento <> 11 AND cliente_servico.id_motivo_cancelamento <> 13 AND cliente_servico.id_motivo_cancelamento <> 16 AND cliente_servico.id_motivo_cancelamento <> 5 AND cliente_servico.id_motivo_cancelamento <> 20 AND cliente_servico.id_motivo_cancelamento <> 28 AND cliente_servico.id_motivo_cancelamento <> 3 AND cliente_servico.id_motivo_cancelamento <> 92 AND cliente_servico.id_motivo_cancelamento <> 91 AND cliente_servico.id_motivo_cancelamento <> 93
      ORDER BY cliente.nome_razaosocial) s
 LEFT JOIN prospecto ON prospecto.nome_razaosocial = s.nome::text
WHERE s.telefone::text <> ''::text`
exports.getClientesInativosProspecto= async(req, res, next)=>{
        var query = '';
        if(req.body['fprospecto'] == 0){
            query = `SELECT * from (${clientes_inativos_prospecto_base}) as k where cidade ='${req.body['city']}'`;
        }else if(req.body['fprospecto'] == -1){
             query = `SELECT * from (${clientes_inativos_prospecto_base}) as k where cidade ='${req.body['city']}' and prospecto='-1'`;
        }else{
             query = `SELECT * from(${clientes_inativos_prospecto_base}) as k where cidade ='${req.body['city']}' and prospecto<>'-1'`;
        }
        
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
    }