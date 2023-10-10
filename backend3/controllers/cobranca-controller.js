const conexao = require('../databases/conexao');
const cidades_case = require('../controllers/cidades_base')


exports.getFaturasAtraso = async(req,res,next)=>{     
     const query = ` SELECT
     *,
     ( EXTRACT ( DAY FROM ( now( ) - cobranca.data_vencimento ) ) ) AS dias_em_atraso 
 FROM
     cobranca
     INNER JOIN tipo_servico ON tipo_servico.id_tipo_servico = cobranca.id_tipo_servico
     INNER JOIN cliente_servico ON cliente_servico.id_cliente_servico = cobranca.id_cliente_servico 
 WHERE
     cobranca.valor_pago IS NULL 
     AND cobranca.data_cancelamento IS NULL 
     AND cobranca.data_vencimento <= now( ) 
     AND cobranca.data_pagamento IS NULL 
     AND cobranca.recebido = 'f' 
     AND cobranca.id_tipo_servico = 99 
     AND cobranca.descricao NOT LIKE'%Plataforma%' 
     AND cobranca.id_empresa = 72
     AND ( cliente_servico.id_servico_status = 11 OR cliente_servico.id_servico_status = 12 OR  cliente_servico.id_servico_status = 14 ) ;`;
     try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
     }

     
exports.getAtendimentos = async(req,res,next)=>{     
    const query = ` SELECT upper(users.name) AS colaborador, tipo_atendimento.descricao AS tipo,
    atendimento.protocolo,
    cliente.nome_razaosocial AS cliente,
    to_char(atendimento.data_cadastro::date, 'DD/MM/YYYY') AS data_cadastro,
        CASE
           ${cidades_case}
        END AS cidade
   FROM atendimento
     JOIN tipo_atendimento ON tipo_atendimento.id_tipo_atendimento = atendimento.id_tipo_atendimento
     JOIN users ON users.id = atendimento.id_usuario_abertura
     JOIN cliente_servico ON cliente_servico.id_cliente_servico = atendimento.id_cliente_servico
     JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
     JOIN cliente_servico_endereco ON cliente_servico_endereco.id_cliente_servico = cliente_servico.id_cliente_servico
     JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
     JOIN cidade ON cidade.id_cidade = endereco_numero.id_cidade
     JOIN usuario_setor ON users.id = usuario_setor.id_usuario
     JOIN setor ON setor.id_setor = usuario_setor.id_setor
     LEFT JOIN ordem_servico ON ordem_servico.id_atendimento = atendimento.id_atendimento
  WHERE cliente_servico_endereco.tipo::text = 'instalacao'::text AND
   setor.id_setor = 46 AND cliente.nome_razaosocial::text !~~ '%TESTE%'::text AND cliente.nome_razaosocial::text !~~ '%ESERV%'::text and
   atendimento.data_cadastro::date >= '${req.body['data_inicial']}' and atendimento.data_cadastro::date <= '${req.body['data_final']}'
    ORDER BY atendimento.data_cadastro desc;`;
    try{
       const resposta = await conexao.query(query);
       res.status(200).send(resposta.rows)
       }catch(erro){
        console.log(erro)
           res.status(400).send(erro)
       }
    }



    exports.getAtendimentosTipoCobranca = async(req,res,next)=>{     
        const query = ` SELECT upper(users.name) AS colaborador, tipo_atendimento.descricao AS tipo,
        atendimento.protocolo,
        cliente.nome_razaosocial AS cliente,
        to_char(atendimento.data_cadastro::date, 'DD/MM/YYYY') AS data_cadastro,
            CASE
               ${cidades_case}
            END AS cidade
       FROM atendimento
         JOIN tipo_atendimento ON tipo_atendimento.id_tipo_atendimento = atendimento.id_tipo_atendimento
         JOIN users ON users.id = atendimento.id_usuario_abertura
         JOIN cliente_servico ON cliente_servico.id_cliente_servico = atendimento.id_cliente_servico
         JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
         JOIN cliente_servico_endereco ON cliente_servico_endereco.id_cliente_servico = cliente_servico.id_cliente_servico
         JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
         JOIN cidade ON cidade.id_cidade = endereco_numero.id_cidade
         JOIN usuario_setor ON users.id = usuario_setor.id_usuario
         JOIN setor ON setor.id_setor = usuario_setor.id_setor
         LEFT JOIN ordem_servico ON ordem_servico.id_atendimento = atendimento.id_atendimento
      WHERE cliente_servico_endereco.tipo::text = 'instalacao'::text AND
       setor.id_setor = 46 AND cliente.nome_razaosocial::text !~~ '%TESTE%'::text AND cliente.nome_razaosocial::text !~~ '%ESERV%'::text
       and tipo_atendimento.id_tipo_atendimento in (66,67,22)  and
       atendimento.data_cadastro::date >= '${req.body['data_inicial']}' and atendimento.data_cadastro::date <= '${req.body['data_final']}'
        ORDER BY atendimento.data_cadastro desc;`;
        try{
           const resposta = await conexao.query(query);
           res.status(200).send(resposta.rows)
           }catch(erro){
            console.log(erro)
               res.status(400).send(erro)
           }
        }
    