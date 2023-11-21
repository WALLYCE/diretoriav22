const conexao = require('../databases/conexao');
const cidades_case = require('../controllers/cidades_base')
const reagendamento_os_data_base = ` SELECT 'reagendamento'::text AS reagendamentos,
users.name AS usuario,
ordem_servico.numero_ordem_servico,
ordem_servico_historico.historico,
ordem_servico_historico.data_cadastro::date AS data_cadastro
FROM ordem_servico_historico
 JOIN ordem_servico ON ordem_servico.id_ordem_servico = ordem_servico_historico.id_ordem_servico
 JOIN users ON users.id = ordem_servico_historico.id_usuario
 JOIN usuario_setor ON usuario_setor.id_usuario = users.id
 JOIN setor ON setor.id_setor = usuario_setor.id_setor
WHERE ordem_servico_historico.historico ~~ 'Data de Início Programado alterado%'::text AND setor.id_setor = 45
ORDER BY users.name`
exports.getReagendamentos= async(req,res,next)=>{         
    const query = `Select k.reagendamentos, 
    k.usuario, 
    k.numero_ordem_servico,
    k.historico, 
    TO_CHAR(k.data_cadastro, 'dd/mm/yyyy') as data_cadastro
     from (${reagendamento_os_data_base}) as k where k.data_cadastro>='${req.body['data_inicial']}' and k.data_cadastro<='${req.body['data_final']}'`;
      
    try{
      const resposta = await conexao.query(query);
      console.log(resposta)
      res.status(200).send(resposta.rows)
      }catch(erro){
          res.status(400).send(erro)
      }
   }