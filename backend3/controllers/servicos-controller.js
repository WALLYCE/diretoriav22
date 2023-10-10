const conexaoMysql = require('../databases/conexao_mysql').pool;
const conexao = require('../databases/conexao');
const cidades_case = require('../controllers/cidades_base')
exports.getServicos = async(req, res, next)=>{
        conexaoMysql.getConnection((error, conn)=>{
        
            const sql = `Select nome, valor, DATE_FORMAT(data_balanc,'%m/%Y') as data  from habilitados_cidade order by nome`;
    
                conn.query(sql, async (erro, resultado)=>{
                    conn.release();
                    if(erro){
                      
                        console.log(erro)
                    }else{
                        console.log(resultado)
                       res.status(200).send(resultado);
                    }
                })
          })
   

    }


    exports.getQuantidadeServicos = async(req,res,next)=>{     

        const query = `SELECT COUNT
	( * ) AS valor 
FROM
	cliente_servico
	JOIN cliente_servico_endereco ON cliente_servico.id_cliente_servico = cliente_servico_endereco.id_cliente_servico
	JOIN endereco_numero ON endereco_numero.id_endereco_numero = cliente_servico_endereco.id_endereco_numero
	JOIN cidade ON endereco_numero.id_cidade = cidade.id_cidade
	JOIN servico_status ON servico_status.id_servico_status = cliente_servico.id_servico_status
	JOIN cliente ON cliente.id_cliente = cliente_servico.id_cliente 
WHERE
	( servico_status.id_servico_status = 11 OR servico_status.id_servico_status = 12 OR servico_status.id_servico_status = 14 ) 
	AND cliente_servico_endereco.tipo :: TEXT = 'instalacao' :: TEXT 
	AND cliente.nome_razaosocial :: TEXT !~~ '%TESTE%' :: TEXT 
	AND cliente.nome_razaosocial :: TEXT !~~ '%ESERV%' :: TEXT 
	AND cliente.nome_razaosocial :: TEXT !~~ '%RICARDO JOSE OLIVEIRA NEVES%' :: TEXT`;
          
        try{
          const resposta = await conexao.query(query);
          res.status(200).send(resposta.rows)
          }catch(erro){
              res.status(400).send(erro)
          }
       }
