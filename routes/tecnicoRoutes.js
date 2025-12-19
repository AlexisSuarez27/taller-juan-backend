const express = require('express');
const tecnicoController = require('../controllers/tecnicoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/ordenes', authMiddleware(['tecnico']), tecnicoController.getParaTecnico);
router.put('/ordenes/:id', authMiddleware(['tecnico']), tecnicoController.updateOrden);


module.exports = router;

