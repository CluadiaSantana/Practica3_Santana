const router = require('express').Router();
const usersRoutes = require('./users');
const salasRoutes = require('./salas');
const messageRoutes= require('./messages')

router.use('/users', usersRoutes);
router.use('/salas', salasRoutes);
router.use('/messages',messageRoutes);

module.exports = router;