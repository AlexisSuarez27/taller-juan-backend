const express = require('express');
const ordenModel = require('../models/ordenModel');

const router = express.Router();

router.get('/consulta/:query', async (req, res) => {
  const { query } = req.params;
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return res.status(400).json({
      msg: 'Ingresa un valor válido'
    });
  }

  try {
    let resultados = [];

    if (/^\d{10}$/.test(trimmedQuery)) {
      resultados = await ordenModel.getByCedula(trimmedQuery);

    } else if (/^\d+$/.test(trimmedQuery)) {
      const orden = await ordenModel.getById(trimmedQuery);
      if (orden) resultados.push(orden);
    }

    if (resultados.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron reparaciones con ese número de orden o cédula.'
      });
    }

    res.json(resultados);
  } catch (error) {
    console.error('Error en consulta pública:', error);
    res.status(500).json({
      msg: 'Error interno del servidor'
    });
  }
});

module.exports = router;
