const express = require('express');
const facturaController = require('../controllers/facturaController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(['admin']), facturaController.getFacturas);
router.get('/:id', authMiddleware(['admin']), facturaController.getFacturaById);

module.exports = router;