const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const MessageController = require('../controllers/messages.controller');

router.post('/',MessageController.newMessenge);

module.exports= router;