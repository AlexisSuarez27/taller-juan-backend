const express = require('express');
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(['admin']), clienteController.getAll);

module.exports = router;