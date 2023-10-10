
const conexao = require("../databases/conexao")
const cidades_case = require('../controllers/cidades_base')
const os_realizada_concluida_map_base = `
SELECT ordem_servico.id_ordem_servico,
ordem_servico.numero_ordem_servico AS numero_os,
    CASE
        ${cidades_case}
    END AS cidade,
tipo_ordem_servico.descricao AS tipo,
users.name AS tecnico_responsavel,
ordem_servico.data_termino_executado::date AS data_termino,
setor.descricao
FROM ordem_servico
 JOIN cliente_servico ON ordem_servico.id_cliente_servico = cliente_servico.id_cliente_servico
 JOIN tipo_ordem_servico ON ordem_servico.id_tipo_ordem_servico = tipo_ordem_servico.id_tipo_ordem_servico
 JOIN cliente_servico_endereco ON cliente_servico_endereco.id_cliente_servico = cliente_servico.id_cliente_servico
 JOIN endereco_numero ON cliente_servico_endereco.id_endereco_numero = endereco_numero.id_endereco_numero
 JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
 JOIN ordem_servico_tecnico ON ordem_servico_tecnico.id_ordem_servico = ordem_servico.id_ordem_servico
 JOIN users ON users.id = ordem_servico_tecnico.id_usuario
 JOIN usuario_setor ON users.id = usuario_setor.id_usuario
 JOIN setor ON setor.id_setor = usuario_setor.id_setor
WHERE cliente_servico_endereco.tipo::text = 'instalacao'::text AND ordem_servico.status_fechamento::text <> 'sem_conclusao'::text AND setor.descricao::text ~~ '%Map'::text
ORDER BY cidade.nome, ordem_servico.data_termino_executado`


exports.getOsRealizadasTecnicosMap= async(req, res, next)=>{   
         
    var query = `Select * from (${os_realizada_concluida_map_base}) as k where k.data_termino >= '${req.body['data_inicial']}' and k.data_termino <= '${req.body['data_final']}'`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
    
 }

exports.getOsRealizadasTecnicosMapCidade = async(req, res, next)=>{   
     
    var query = `Select * from (${os_realizada_concluida_map_base}) as k  where k.data_termino >= '${req.body['data_inicial']}' and k.data_termino <= '${req.body['data_final']}'`;
    if(req.body['cidade']!= 'Geral'){
        query+=` and k.cidade = '${req.body['cidade']}'`
    }
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
    
    
 }



 
exports.getOsManutencaoClientes = async(req, res, next)=>{   
     
     
    const query = `Select * from os_manutencao_clientes_map where data_termino >= '${req.body['data_inicial']}' and data_termino <= '${req.body['data_final']}'`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
    
    
 }