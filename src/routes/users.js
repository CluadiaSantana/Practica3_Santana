const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const UsersController = require('../controllers/users.controller');



router.post('/',UsersController.sign);
router.post('/login',UsersController.login);


module.exports = router;