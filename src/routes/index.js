const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/criarConta', userController.criarConta);
router.post('/login', userController.login);
router.post('/faturarPedido', userController.faturarPedido);

module.exports = router;
