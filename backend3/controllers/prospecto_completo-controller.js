const conexao = require("../databases/conexao")
const cidades_case = require('../controllers/cidades_base')
const prospecto_completo_base = ` SELECT j.nome_razaosocial AS nome_cliente,
j.created_at::date AS data,
j.name AS vendedor,
j.cidade,
COALESCE(k.historico, ''::text) AS prospecto
FROM ( SELECT prospecto.nome_razaosocial,
        prospecto.created_at,
        users.name,
            CASE
   ${cidades_case}
            END AS cidade,
        prospecto.id_prospecto
       FROM prospecto
         JOIN prospecto_historico ON prospecto_historico.id_prospecto = prospecto.id_prospecto
         JOIN users ON users.id = prospecto.id_usuario
         JOIN endereco_numero ON prospecto.id_endereco_numero = endereco_numero.id_endereco_numero
         JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
      WHERE prospecto_historico.historico = 'Prospecto cadastrado'::text) j
 LEFT JOIN ( SELECT prospecto_historico.id_prospecto_historico,
        prospecto_historico.id_prospecto,
        prospecto_historico.id_usuario,
        prospecto_historico.historico,
        prospecto_historico.data_cadastro,
        prospecto_historico.ip_cadastro
       FROM prospecto_historico
      WHERE prospecto_historico.historico = 'Prospecto foi convertido em cliente.'::text) k ON j.id_prospecto = k.id_prospecto
ORDER BY j.cidade`
exports.getProspecto = async (req,res, next)=>{

    const query = `Select * from (${prospecto_completo_base}) as l where l.data >='${req.body['data_inicial']}' and l.data<='${req.body['data_final']}'`;
    
    try{
    const resposta = await conexao.query(query);
    res.status(200).send(resposta.rows)
    }catch(erro){
        res.status(400).send(erro)
    }

 }
