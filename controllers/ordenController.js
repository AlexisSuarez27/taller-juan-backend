const ordenModel = require('../models/ordenModel');
const clienteModel = require('../models/clienteModel');
const repuestoModel = require('../models/repuestoModel');

exports.create = async (req, res) => {
  const {
    nombre_cliente, cedula, telefono, correo,
    nombre_equipo, marca, modelo,
    reparaciones = [],
    repuestos_extras = [],
    fecha
  } = req.body;

  if (reparaciones.length === 0 && repuestos_extras.length === 0) {
    return res.status(400).json({ msg: 'Debe seleccionar al menos una reparación o un repuesto' });
  }

  try {
    let cliente = await clienteModel.findByCedula(cedula);
    if (!cliente) {
      cliente = { nombre: nombre_cliente, cedula, telefono, correo };
      const id_cliente = await clienteModel.create(cliente);
      cliente.id_cliente = id_cliente;
    }

    const tieneReparaciones = reparaciones.length > 0;
    const estado = tieneReparaciones ? 'Recibido' : 'Finalizada';

    const orden = {
      id_cliente: cliente.id_cliente,
      nombre_equipo: nombre_equipo || (repuestos_extras.length > 0 ? 'Venta de repuestos' : null),
      marca: marca || null,
      modelo: modelo || null,
      fecha,
      estado
    };

    const id_orden = await ordenModel.create(orden);

    if (tieneReparaciones) {
      await ordenModel.createReparaciones(id_orden, reparaciones);
    }

    if (repuestos_extras.length > 0) {
      await ordenModel.createRepuestosExtras(id_orden, repuestos_extras);
    }

    if (estado === 'Finalizada' && repuestos_extras.length > 0) {
      await ordenModel.restarStockAlFinalizar(id_orden);
    }

    res.status(201).json({ 
      id_orden,
      msg: `Orden creada correctamente con estado: ${estado}`
    });
  } catch (err) {
    console.error('Error al crear orden:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const ordenes = await ordenModel.getAll();
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const orden = await ordenModel.getDetalleFactura(req.params.id);
    if (!orden) {
      return res.status(404).json({ msg: 'Orden no encontrada' });
    }
    res.json(orden);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    await ordenModel.remove(req.params.id);
    res.json({ msg: 'Orden eliminada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getParaTecnico = async (req, res) => {
  try {
    const ordenes = await ordenModel.getParaTecnico();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ msg: 'Error del servidor' });
  }
};