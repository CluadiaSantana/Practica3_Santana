const { Db } = require('mongodb');
const UsersController = require('../controllers/users.controller');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const UsersControlle = require('../controllers/users.controller');



router.post('/',UsersController.sign);
router.post('/login',UsersControlle.login);


module.exports = router;