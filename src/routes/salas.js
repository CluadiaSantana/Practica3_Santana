const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const SalaController = require('../controllers/salas.controller');

router.post('/',SalaController.create);
router.post('/link',SalaController.createLink);
router.post('/link/:id', SalaController.signSalaLink);

module.exports = router;