const conexao = require('../databases/conexao');

exports.getErroProcedimento = async(req,res,next)=>{     
     const query = ` SELECT atendimento.protocolo AS id,
     users.name AS abertura,
     atendimento.descricao_abertura,
     to_char(atendimento.data_cadastro::date::timestamp with time zone, 'dd/MM/YYYY'::text) AS data_cadastro,
     atendimento.id_atendimento
    FROM atendimento
      JOIN users ON users.id = atendimento.id_usuario_abertura
   WHERE atendimento.id_tipo_atendimento = 264 OR atendimento.id_tipo_atendimento = 265
   ORDER BY (atendimento.data_cadastro::date) DESC`;
     try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
     }
