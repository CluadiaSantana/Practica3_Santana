const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const axios = require('axios');
const MongoClient= require('mongodb').MongoClient;
const users = require('./src/routes/users'); 
const port = process.env.PORT;
const Database = require('./src/models/database');
const apiRoutes = require('./src/routes');
let database;

app.use(express.static(path.join(__dirname, 'public')));

if(process.env.NODE_ENV === 'dev'){
    require('dotenv').config();
}

app.use(router);
app.use('/api', apiRoutes);

MongoClient.connect(process.env.MONGO_URL,{
    useUnifiedTopology: true
}, function(err,client){
    if(err){
        console.log('Failed to connect to MongoDB');
    }else{
        console.log('Se conecto a la base de datos');
        const database=client.db();
        app.listen(port,() =>{
            console.log('App is listening in port' + port);
        } );
    }
});

