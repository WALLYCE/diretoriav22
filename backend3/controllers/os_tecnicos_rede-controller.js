const conexao = require('../databases/conexao');
const cidades_case = require('../controllers/cidades_base')
const os_tecnicos_rede_base = `
SELECT cliente.codigo_cliente,
ordem_servico.numero_ordem_servico,
tipo_ordem_servico.descricao,
users.name AS tecnicos,
ordem_servico.descricao_servico,
ordem_servico.data_inicio_executado,
ordem_servico.data_termino_executado,
ordem_servico.data_inicio_executado::date AS dia_execucao,
cliente_servico.referencia,
ordem_servico.descricao_fechamento
FROM ordem_servico
 JOIN ordem_servico_tecnico ON ordem_servico.id_ordem_servico = ordem_servico_tecnico.id_ordem_servico
 JOIN users ON users.id = ordem_servico_tecnico.id_usuario
 JOIN usuario_setor ON usuario_setor.id_usuario = users.id
 JOIN setor ON usuario_setor.id_setor = setor.id_setor
 JOIN tipo_ordem_servico ON ordem_servico.id_tipo_ordem_servico = tipo_ordem_servico.id_tipo_ordem_servico
 JOIN cliente_servico ON ordem_servico.id_cliente_servico = cliente_servico.id_cliente_servico
 JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente
WHERE setor.descricao::text ~~ ' Rede'::text`
exports.getOSTecnicoRede = async(req, res, next)=>{
    const query = `Select *  from (${os_tecnicos_rede_base}) as k where k.dia_execucao >= '${req.body['data_inicial']}' and k.dia_execucao <= '${req.body['data_final']}';`;
    
    try{
    const resposta = await conexao.query(query);
    res.status(200).send(resposta.rows)
    }catch(erro){
        res.status(400).send(erro)
    }

}
