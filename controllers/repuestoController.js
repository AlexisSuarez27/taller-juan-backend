const repuestoModel = require('../models/repuestoModel');

exports.getAll = async (req, res) => {
  try {
    const repuestos = await repuestoModel.getAll();
    res.json(repuestos);
  } catch (err) {
    res.status(500).json({ msg: 'Error' });
  }
};