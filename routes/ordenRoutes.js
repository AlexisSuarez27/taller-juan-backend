const express = require('express');
const ordenController = require('../controllers/ordenController');
const authMiddleware = require('../middleware/authMiddleware');
const tecnicoController = require('../controllers/tecnicoController');
const router = express.Router();

router.post('/', authMiddleware(['admin']), ordenController.create);  
router.get('/', authMiddleware(['admin']), ordenController.getAll); 
router.get('/:id', authMiddleware(['admin']), ordenController.getById);
router.delete('/:id', authMiddleware(['admin']), ordenController.remove);
router.get('/tecnico', authMiddleware(['tecnico']), ordenController.getParaTecnico);
router.put('/tecnico/ordenes/:id', authMiddleware(['tecnico']), tecnicoController.updateOrden);


router.get('/consulta/:query', async (req, res) => {
  const { query } = req.params;
  try {
    let orden;
    if (!isNaN(query)) {  
      orden = await ordenModel.getById(query);
    } else {  
      orden = await ordenModel.getByCedula(query);
    }
    if (!orden) return res.status(404).json({ msg: 'No encontrado' });
    res.json(orden);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;