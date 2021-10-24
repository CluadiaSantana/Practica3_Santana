const Database = require('../models/database');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let secret = process.env.JWTSECRET;

class MessengeController{
    static authPer(token) {
        let decoded;
        try {
            decoded = jwt.verify(token, secret);
        }
        catch (err) {
            return;
        }
        let reg = [];
        reg.push(decoded.rol);
        reg.push(decoded.email);
        reg.push(decoded.id);
        //console.log(`reg 0 es ${reg[0]}`);
        return reg;
    }

    static newMessenge(req,res){
        let token= req.headers["x-auth"];
        if(!token){
            return res.status(401).end();
        }
        let userPer = MessengeController.authPer(token);
        let sala= req.body.sala;
        const database= new Database("messages");
        const datarela= new Database("userSala");
        datarela.findOne({user: userPer[1], sala: sala})
        .then(results =>{
            if(results){
                database.insertOne({
                    author: userPer[1],
                    sala: sala,
                    message: req.body.message,
                    date: new Date()
                }).then(response => {
                    return res.status(201).end();
                }).catch(error => {
                    return res.status(400).end();
                });
            }else{
                res.statusMessage = "User not alredy register in the chat!";
                return res.status(401).end(); 
            }
        })
    }
}
 module.exports= MessengeController;