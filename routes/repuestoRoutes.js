const express = require('express');
const repuestoController = require('../controllers/repuestoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(['admin', 'tecnico']), repuestoController.getAll);

module.exports = router;