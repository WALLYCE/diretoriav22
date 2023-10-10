const conexao = require('../databases/conexao');

exports.getAtendimento = async(req,res,next)=>{         
    const query = `Select * from atendimento inner join users on users.id = atendimento.id_usuario_abertura  where atendimento.protocolo = '${req.body['protocolo']}'`;
      
    try{
      const resposta = await conexao.query(query);
      res.status(200).send(resposta.rows)
      }catch(erro){
          res.status(400).send(erro)
      }
   }

  exports.getMensagemAtendimento = async(req,res,next)=>{          
    const query = `SELECT * FROM "atendimento_mensagem" inner join atendimento on atendimento.id_atendimento = atendimento_mensagem.id_atendimento INNER JOIN users on users."id" = atendimento_mensagem.id_usuario  where atendimento.protocolo = '${req.body['protocolo']}'`;
     
    try{
      const resposta = await conexao.query(query);
      res.status(200).send(resposta.rows)
      }catch(erro){
          res.status(400).send(erro)
      }
   }