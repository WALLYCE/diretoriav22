const conexao = require('../databases/conexao')

exports.getClientesServicosOnusRetiradas = async(req,res,next)=>{
    const query = `SELECT * from clientes_servicos_onus_retiradas where data_cancelamento>= '${req.body['data_inicial']}' and data_cancelamento<= '${req.body['data_final']}' `;
    try{
        const resposta = await conexao.query(query);
        res.status(200).send(resposta.rows)
        }catch(erro){
            res.status(400).send(erro)
        }
}