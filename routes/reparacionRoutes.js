const express = require('express');
const reparacionController = require('../controllers/reparacionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(['admin', 'tecnico']), reparacionController.getAll);

module.exports = router;