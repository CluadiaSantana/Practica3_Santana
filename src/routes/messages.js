const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const swaggerJsDoc= require('swagger-jsdoc');
const swaggerUI= require('swagger-ui-express');
const MessageController = require('../controllers/messages.controller');

/**
 * @swagger
 * 
 * /api/messages:
 *   post:
 *     summary: create a new message in a chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the name of the chat and the message to post
 *             type: object
 *           example: 
 *             sala: "nj2l3jbjh"
 *             message: "Prueba de mensaje"
 *     responses:
 *       201:
 *         description: Message post correctly!
 *       401:
 *         description: User not alredy register in the chat!
 *       400:
 *         description: Sala not alredy exist!!  
 */

router.post('/',MessageController.newMessenge);

module.exports= router;