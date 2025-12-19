const reparacionModel = require('../models/reparacionModel');

exports.getAll = async (req, res) => {
  try {
    const reparaciones = await reparacionModel.getAll();
    res.json(reparaciones);
  } catch (err) {
    res.status(500).json({ msg: 'Error' });
  }
};