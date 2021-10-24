const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const SalaController = require('../controllers/salas.controller');

/**
 * @swagger
 * 
 * /api/salas:
 *   post:
 *     summary: create a new chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the email and password
 *             type: object
 *           example: 
 *             name: "Claudia Santana"
 *     responses:
 *       201:
 *         description: User created correctly!
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User not alredy exist!!  
 */
router.post('/',SalaController.create);
/**
 * @swagger
 * 
 * /api/salas/link:
 *   post:
 *     summary: create a link to register in a chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the name of the chat that you´re the own
 *             type: object
 *           example: 
 *             name: "Claudia Santana"
 *     responses:
 *       201:
 *         description: Link created correctly!
 *       401:
 *         description: Unathorizade!
 *       400:
 *         description: Sala not alredy exist!!  
 */
router.post('/link',SalaController.createLink);
/**
 * @swagger
 * 
 * /api/salas/link/{id}:
 *   post:
 *     summary: use a link to register in a chat
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          wn1wk74eq
 *     responses:
 *       201:
 *         description: User register correctly!
 *       400:
 *         description: User already register!
 *       404:
 *         description: Sala not alredy exist!!  
 */
router.post('/link/:id', SalaController.signSalaLink);

module.exports = router;