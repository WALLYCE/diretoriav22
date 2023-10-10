const conexao = require('../databases/conexao');
const cidades_case = require('../controllers/cidades_base')

exports.getCidadesAtendidas = async(req,res,next)=>{
        const query = ` SELECT k.nome,
        k.id_cidade
       FROM ( SELECT DISTINCT cidade.nome AS cidade,
                cidade.id_cidade,
                    CASE
                        ${cidades_case}
                    END AS nome
               FROM cliente_servico
                 JOIN cliente_servico_endereco ON cliente_servico_endereco.id_cliente_servico = cliente_servico.id_cliente_servico
                 JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
                 JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
              WHERE cliente_servico_endereco.tipo::text = 'instalacao'::text AND cliente_servico.id_servico_status = 11 AND cidade.nome::text <> 'São Paulo'::text
              ORDER BY cidade.nome) k`;
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
    }