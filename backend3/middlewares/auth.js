const jwt = require('jsonwebtoken');
const {promisify} = require('util');
require('dotenv').config()

exports.authenticated =  async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).send({error: "Token was not provided"})
    }
   const[,token] = authHeader.split(' ');
   try{
    const decoded = await promisify(jwt.verify)(token,  process.env.JWT_TOKEN)
    req.userId = decoded.id;
    next();
   }catch(error){
    res.status(401).send({error: "Erro de autenticação"})
   }

  
}