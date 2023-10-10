const conexaoMysql = require('../databases/conexao_mysql').pool
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.addUser = async(req, res, next)=>{
    conexaoMysql.getConnection((error, conn)=>{
        if(error) {res.status(500).send({error: error})}
        conn.query('select email from users where email = ?', [req.body.email], (error, result)=>{
            if(error){res.status(500).send({error: error})}
            if(result.length > 0){
                conn.release();
                res.status(500).send({error: "e-mail já cadastrado"})
            }else{
                bcrypt.hash(req.body.senha, 10, (erroBcrypt, hash)=>{
                    if(erroBcrypt){res.status(500).send({error: erroBcrypt})}
                        conn.query('INSERT INTO users (email, password, nivel_acesso, name) VALUES(?,?,?,?)', [req.body.email, hash, req.body.nivel_acesso, req.body.name], (error, resultado)=>{
                            conn.release();
                            if(error){res.status(500).send({error: error})}
                            else{
                            resposta = {
                                message: "Usuário inserido com sucesso.",
                                dados:{
                                    id: resultado.insertId,
                                    email: req.body.email
                                }
                            }
                            res.status(201).send(resposta)
                            }
                        })
                    })

            }
        })


        })
        

    }


exports.getPages = async(req, res, next)=>{
    conexaoMysql.getConnection((error, conn)=>{ 
        if(error){ conn.release();res.status(401).send({error: error})}
         var query = `SELECT nivel_acesso FROM users WHERE email = ? `;
         conn.query(query, req.body.email.toString(), (error, result)=>{
            conn.release();
            if(error){res.status(500).send({error: error})}
            else{
            
                res.status(200).send(result)
            }
         })
        })
    }



exports.loginUser = async(req, res, next) =>{
    conexaoMysql.getConnection((error, conn)=>{ 
        if(error){ conn.release();res.status(401).send({error: error})}
         var query = `SELECT * FROM users WHERE email = ? `;
         conn.query(query, req.body.email, (error, result)=>{
            conn.release();
            if(error){res.status(500).send({error: error})}
            else{
                if(result.length == 0){
                    res.status(500).send({error: "Falha na autenticação"})
                }else{
                    bcrypt.compare(req.body.password, result[0].password, (erroBcrypt, resultado)=>{
                        if(erroBcrypt){res.status(401).send({error: "Falha na autenticação"})}
                        if(resultado){
                   
                         const token = jwt.sign({
                            email: result[0].email,
                            id_users: result[0].id_users,
                            nivel_acesso: result[0].nivel_acesso    
                         }, process.env.JWT_TOKEN,
                         {
                            expiresIn: "5h"
                         }
                         );

                         const resposta = {
                            message: "Autenticado com sucesso",
                            dados: {
                                email: result[0].email,
                                nivel_acesso: result[0].nivel_acesso,
                                token: token
                            }
                         }
                        res.status(200).send(resposta)}
                        else{res.status(401).send({error: "Falha na autenticação"})}
                    })
                }

            }
         })
     })
}
