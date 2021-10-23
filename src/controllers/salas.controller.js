const Database = require('../models/database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let secret = process.env.JWTSECRET;
let host = process.env.HOST;
class SalaController{
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

    static create(req,res){
        const database= new Database('salas')
        const datarela= new Database('userSala');
        let token= req.headers["x-auth"];
        let userPer = SalaController.authPer(token);
        //console.log(secret);
        //console.log(userPer);
        if(!userPer){
            return res.status(401).end()
        }
        if(!req.body.name){
            res.statusMessage = "Name is missing!";
            return res.status(400).end();
        }
        let id=""+ Math.random().toString(36).substr(2, 9)
        database.insertOne({
            name: req.body.name,
            owner: userPer[1],
            id: id
        }).then(response=>{
            datarela.insertOne({
                user: userPer[1],
                sala: id
            })
            return res.status(201).end();
        })
        .catch(error =>{
            res.statusMessage = "The name already exist!";
            return res.status(400).end();
        });
        datarela.insertOne({
            user: userPer[1],
            sala: id
        })
    }

    static createLink(req,res){
        const database= new Database('salas');
        let token= req.headers["x-auth"];
        let userPer = SalaController.authPer(token);
        if(!userPer){
            return res.status(401).end()
        }
        database.findOne({name: req.body.name}).then(
            results=>{
                if(results){
                    if(userPer[1] != results.owner){
                        return res.status(401).end()
                    }else{
                    return res.status(201).send( host+"api/salas/link/"+results.id);
                    }
                }else{
                    res.statusMessage = "Sala not alredy exist!!";
                    return res.status(400).end();
                }
            })
    }

    static signSalaLink(req,res){
        const database= new Database('salas')
        const datarela= new Database('userSala')
        let token= req.headers["x-auth"];
        let userPer = SalaController.authPer(token);
        if(!userPer){
            return res.status(401).end()
        }database.findOne({id: req.params.id}).then(
            results=>{
                if(results){
                    datarela.insertOne({
                        user: userPer[1],
                        sala: req.params.id,
                        id:""+ Math.random().toString(36).substr(2, 9)
                    }).then(response => {
                        return res.status(201).end();
                    })
                        .catch(error => {
                        res.statusMessage = "User already exist!";
                        return res.status(400).end();
                    });
                }else{
                    res.statusMessage = "Sala not alredy exist!!";
                    return res.status(400).end();
                }
            })
    }

}

module.exports = SalaController;