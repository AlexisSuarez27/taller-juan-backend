const facturaModel = require('../models/facturaModel');

exports.getFacturas = async (req, res) => {
  const { desde, hasta } = req.query;

  try {
    const facturas = await facturaModel.getAll(desde, hasta);
    res.json(facturas);
  } catch (err) {
    console.error("Error en getFacturas:", err);
    res.status(500).json({ msg: 'Error al cargar facturas' });
  }
};

exports.getFacturaById = async (req, res) => {
  try {
    const factura = await facturaModel.getById(req.params.id);
    if (!factura) {
      return res.status(404).json({ msg: 'Factura no encontrada' });
    }
    res.json(factura);
  } catch (err) {
    console.error("Error en getFacturaById:", err);
    res.status(500).json({ msg: 'Error al cargar detalle de factura' });
  }
};