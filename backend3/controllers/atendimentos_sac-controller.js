const conexao = require('../databases/conexao');
const cidades_case = require('../controllers/cidades_base')
const atendimento_sac_base = ` SELECT tipo_atendimento.descricao AS tipo,
atendimento.protocolo,
cliente.nome_razaosocial AS cliente,
atendimento.data_cadastro::date AS data_cadastro,
    CASE
      ${cidades_case}
    END AS cidade,
users.name AS colaborador,
ordem_servico.numero_ordem_servico AS numero_os
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
WHERE cliente_servico_endereco.tipo::text = 'instalacao'::text AND setor.id_setor = 11 AND cliente.nome_razaosocial::text !~~ '%TESTE%'::text AND cliente.nome_razaosocial::text !~~ '%ESERV%'::text`

exports.getAtendimentoSac = async(req,res,next)=>{         
    const query = `Select 
    k.tipo, 
    k.protocolo, 
    k.cliente, 
    TO_CHAR(k.data_cadastro, 'dd/mm/yyyy') as data_cadastro, 
    k.cidade, 
    k.colaborador,
    k.numero_os 
     from (${atendimento_sac_base}) k where k.data_cadastro>='${req.body['data_inicial']}' and k.data_cadastro<='${req.body['data_final']}'`;
      
    try{
      const resposta = await conexao.query(query);
      res.status(200).send(resposta.rows)
      }catch(erro){
          res.status(400).send(erro)
      }
   }

   exports.getAtendimentoSacPeriodo = async(req,res,next)=>{ 
    var query = '';  
    if(req.body['Local'] === 'Geral') {     
    query = `SELECT concat(concat(DATE_PART('year',atendimentos_sac.data_cadastro),'/'),
    DATE_PART('month',atendimentos_sac.data_cadastro)) as periodo ,
    count(*) as quantidade,  sum(case when atendimentos_sac.numero_os is not null then 1 else 0 end) as viraram_os  
    from (${atendimento_sac_base}) as atendimentos_sac where atendimentos_sac.data_cadastro >='2021/09/01' 
    GROUP BY (DATE_PART('year',atendimentos_sac.data_cadastro), DATE_PART('month',atendimentos_sac.data_cadastro)) order by DATE_PART('year',atendimentos_sac.data_cadastro), DATE_PART('month',atendimentos_sac.data_cadastro) `;
    }else{
        query = `SELECT concat(concat(DATE_PART('year',atendimentos_sac.data_cadastro),'/'),
        DATE_PART('month',atendimentos_sac.data_cadastro)) as periodo ,
        count(*) as quantidade, 
         sum(case when atendimentos_sac.numero_os is not null then 1 else 0 end) as viraram_os  from  (${atendimento_sac_base}) as atendimentos_sac  where data_cadastro >='2021/09/01' and cidade = '${req.body['Local']}' GROUP BY (DATE_PART('year',atendimentos_sac.data_cadastro), DATE_PART('month',atendimentos_sac.data_cadastro)) order by DATE_PART('year',atendimentos_sac.data_cadastro), DATE_PART('month',atendimentos_sac.data_cadastro)`;

    }
    try{
      const resposta = await conexao.query(query);
      res.status(200).send(resposta.rows)
      }catch(erro){
          res.status(400).send(erro)
      }
   }