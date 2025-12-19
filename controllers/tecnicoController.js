const ordenModel = require('../models/ordenModel');

exports.getParaTecnico = async (req, res) => {
  try {
    const ordenes = await ordenModel.getParaTecnico(); 
    res.json(ordenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

exports.updateOrden = async (req, res) => {
  const { id } = req.params;
  const { estado, comentario_tecnico } = req.body;

  try {
    const updates = {};
    if (comentario_tecnico !== undefined) updates.comentario_tecnico = comentario_tecnico;
    if (estado) updates.estado = estado;

    if (estado === 'Finalizada') {
      await ordenModel.restarStockAlFinalizar(id);
    }

    await ordenModel.update(id, updates);
    res.json({ msg: 'Orden actualizada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      msg: 'Error al actualizar: stock insuficiente o problema en la orden' 
    });
  }
};