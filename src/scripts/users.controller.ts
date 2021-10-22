const Database = require('../models/database');
const path = require('path');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();
const express = require('express');

let secret: string= process.env.JWTSECRET;
class UsersControlle{  
    static sign(req,res){
        const database = new Database('users')
        let{name, username, password, email} = req.body
        if(!name || !username || !password || !email) {
            return res.status(400).send("Somedata is missing");
        }
        let codepass = bcrypt.hashSync(password, 10);
          database.insertOne({
            name: name,
            email: email,
            password: codepass,
            username: username,
            rol: "Usuario",
        }).then(response=>{
            res.status(201).end()})
        .catch((error)=>{
            res.statusMessage= "User already exist!",
            res.status(400).end()
        })
    }


    static login(req,res){
      let {email, password}= req.body;
      if(!email || !password){
        res.statusMessage= "User dosen´t exist!",
        res.status(400).end();
      }
      const database = new Database('users');
      var user;
      database.findOne({email: req.body.email})
          .then(results => {
              if(results) {
                if(!bcrypt.compareSync(password, results.password)){
                  res.statusMessage= "Incorect password!",
                   res.status(400).end();
                 }
                 let response = {
                   email: results.email,
                   nombre: results.nombre,
                   rol: results.rol,
                 };
                 let token = jwt.sign(response, secret);
                 res.status(200).send({
                   "email": response.email,
                   "rol": response.rol,
                   "token": token
                 });
              } else {
                res.statusMessage= "User not alredy exist!!",
                res.status(400).end();
              }
      })
       
    }
}

module.exports = UsersControlle;


