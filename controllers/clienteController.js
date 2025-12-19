const clienteModel = require('../models/clienteModel');

exports.getAll = async (req, res) => {
  try {
    const clientes = await clienteModel.getAll();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};