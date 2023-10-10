const conexao = require("../databases/conexao")

exports.getClientesInadimplentes = async (req, res, next)=>{
    const query = `SELECT codigo as id,
     nome, 
     plano, 
     cidade, 
     (faturas/3) as faturas, 
     CONCAT(((faturas/3)*30)::text, ' dias') as tempo, 
     valor, status from clientes_boletos_atraso where faturas>=${req.body['minimo']}`;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
}
