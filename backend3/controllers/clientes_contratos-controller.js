const conexao = require("../databases/conexao")
const cidades_case = require('../controllers/cidades_base')
exports.getClientesContratos = async(req,res,next)=>{
        const query = `SELECT
        cliente.codigo_cliente AS codigo,
        cliente.nome_razaosocial AS nome,
        servico.descricao AS plano,
        servico.valor,
        servico_tecnologia.descricao AS tecnologia,
        vencimento.dia_vencimento,
        endereco_numero.bairro,
        endereco_numero.endereco,
        endereco_numero.numero,
        endereco_numero.complemento,
        cliente.telefone_primario AS telefone,
        cliente.telefone_secundario AS telefone2,
        cliente_servico.data_renovacao AS data_venda,
        ( ( SELECT cliente_servico.data_renovacao + '1 year' :: INTERVAL ) ) :: DATE AS vencimento,
    CASE
    ${cidades_case}
    END AS cidade,
                                                                        date_part( 'day' :: TEXT, now( ) - ( cliente_servico.data_renovacao + '1 year' :: INTERVAL ) :: TIMESTAMP WITH TIME ZONE ) AS vencido 
                                                                    FROM
                                                                        cliente_servico
                                                                        JOIN cliente ON cliente_servico.id_cliente = cliente.id_cliente
                                                                        JOIN servico_status ON cliente_servico.id_servico_status = servico_status.id_servico_status
                                                                        JOIN cliente_servico_endereco ON cliente_servico_endereco.id_cliente_servico = cliente_servico.id_cliente_servico
                                                                        JOIN endereco_numero ON cliente_servico_endereco.id_endereco_numero = endereco_numero.id_endereco_numero
                                                                        JOIN cidade ON cidade.id_cidade = endereco_numero.id_cidade
                                                                        JOIN servico_tecnologia ON servico_tecnologia.id_servico_tecnologia = cliente_servico.id_servico_tecnologia
                                                                        JOIN servico ON servico.id_servico = cliente_servico.id_servico
                                                                        JOIN vencimento ON vencimento.id_vencimento = cliente_servico.id_vencimento 
                                                                    WHERE
                                                                        ( servico_status.id_servico_status = 11 OR servico_status.id_servico_status = 12 OR servico_status.id_servico_status = 14 ) 
                                                                        AND cliente_servico_endereco.tipo :: TEXT = 'instalacao' :: TEXT 
                                                                        AND cliente.nome_razaosocial :: TEXT !~~ '%TESTE%' :: TEXT 
                                                                        AND cliente.nome_razaosocial :: TEXT !~~ '%ESERV%' :: TEXT 
                                                                        AND cliente.nome_razaosocial :: TEXT !~~ '%RICARDO JOSE OLIVEIRA NEVES%' :: TEXT 
                                                                ORDER BY
        cidade.nome`;
        try{
            const resposta = await conexao.query(query);
            res.status(200).send(resposta.rows)
            }catch(erro){
                res.status(400).send(erro)
            }
    }
