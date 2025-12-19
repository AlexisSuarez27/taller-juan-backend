const db = require('../config/db');

module.exports = {

  getAll: async () => {
    const [rows] = await db.query(`
      SELECT 
      o.id_orden,
      o.fecha,
      o.estado,
      o.nombre_equipo,
      o.marca,
      o.modelo,
      c.nombre AS cliente_nombre,
      c.cedula
    FROM ordenes o
    INNER JOIN clientes c ON o.id_cliente = c.id_cliente
    INNER JOIN orden_reparaciones orp ON o.id_orden = orp.id_orden  -- Solo órdenes con reparaciones
    ORDER BY o.fecha DESC
  `);
    return rows;
  },
  create: async (orden) => {
    const [result] = await db.query('INSERT INTO ordenes SET ?', orden);
    return result.insertId;
  },
  update: async (id, updates) => {
    await db.query('UPDATE ordenes SET ? WHERE id_orden = ?', [updates, id]);
  },
  remove: async (id) => {
    await db.query('DELETE FROM ordenes WHERE id_orden = ?', [id]);
  },
getById: async (id) => {
  const [rows] = await db.query(`
    SELECT 
      o.id_orden, o.nombre_equipo, o.marca, o.modelo, 
      o.estado, o.comentario_tecnico, o.fecha,
      c.nombre AS cliente_nombre, c.cedula
    FROM ordenes o
    JOIN clientes c ON o.id_cliente = c.id_cliente
    WHERE o.id_orden = ?
  `, [id]);
  return rows[0] || null;
},

getByCedula: async (cedula) => {
  const [rows] = await db.query(`
    SELECT 
      o.id_orden, o.nombre_equipo, o.marca, o.modelo, 
      o.estado, o.comentario_tecnico, o.fecha,
      c.nombre AS cliente_nombre, c.cedula
    FROM ordenes o
    JOIN clientes c ON o.id_cliente = c.id_cliente
    WHERE c.cedula = ?
    ORDER BY o.fecha DESC
  `, [cedula]);
  return rows;
},
  createReparaciones: async (id_orden, reparaciones) => {
    if (reparaciones.length === 0) return;
    const values = reparaciones.map(id => [id_orden, id]);
    await db.query('INSERT INTO orden_reparaciones (id_orden, id_reparacion) VALUES ?', [values]);
  },

  createRepuestosExtras: async (id_orden, repuestos) => {
    if (!repuestos || repuestos.length === 0) return;
    const values = repuestos.map(r => [id_orden, r.id_repuesto, r.cantidad || 1]);
    await db.query('INSERT INTO orden_repuestos (id_orden, id_repuesto, cantidad) VALUES ?', [values]);
  },

  getDetalleFactura: async (id) => {
    const [ordenBase] = await db.query(`
      SELECT o.*, c.nombre AS cliente_nombre, c.cedula, c.telefono, c.correo
      FROM ordenes o
      JOIN clientes c ON o.id_cliente = c.id_cliente
      WHERE o.id_orden = ?
    `, [id]);

    if (!ordenBase[0]) return null;

    const [reparaciones] = await db.query(`
      SELECT r.nombre, r.precio_mano_obra
      FROM orden_reparaciones ore
      JOIN reparaciones r ON ore.id_reparacion = r.id_reparacion
      WHERE ore.id_orden = ?
    `, [id]);

    const [repuestosExtras] = await db.query(`
      SELECT rep.nombre, rep.precio, ore.cantidad
      FROM orden_repuestos ore
      JOIN repuestos rep ON ore.id_repuesto = rep.id_repuesto
      WHERE ore.id_orden = ?
    `, [id]);

    const totalManoObra = reparaciones.reduce((sum, r) => sum + parseFloat(r.precio_mano_obra), 0);
    const totalRepuestos = repuestosExtras.reduce((sum, r) => sum + parseFloat(r.precio) * r.cantidad, 0);
    const total = totalManoObra + totalRepuestos;

    return {
      ...ordenBase[0],
      reparaciones,
      repuestos_usados: repuestosExtras,
      total_mano_obra: totalManoObra.toFixed(2),
      total_repuestos: totalRepuestos.toFixed(2),
      total_general: total.toFixed(2)
    };
  },

  restarStockAlFinalizar: async (id_orden) => {
    await db.query(`
      UPDATE repuestos rep
      JOIN orden_repuestos ore ON rep.id_repuesto = ore.id_repuesto
      SET rep.stock = rep.stock - ore.cantidad
      WHERE ore.id_orden = ? AND rep.stock >= ore.cantidad
    `, [id_orden]);
  }, 
getParaTecnico: async () => {
  const [ordenesBase] = await db.query(`
    SELECT 
      o.id_orden, o.nombre_equipo, o.marca, o.modelo,
      o.estado, o.comentario_tecnico, o.fecha,
      c.nombre AS cliente_nombre, c.telefono, c.correo
    FROM ordenes o
    JOIN clientes c ON o.id_cliente = c.id_cliente
    WHERE o.estado != 'Finalizada'
    ORDER BY o.fecha DESC
  `);

  for (let orden of ordenesBase) {
    const [reparaciones] = await db.query(`
      SELECT r.id_reparacion, r.nombre, r.precio_mano_obra
      FROM orden_reparaciones ore
      JOIN reparaciones r ON ore.id_reparacion = r.id_reparacion
      WHERE ore.id_orden = ?
    `, [orden.id_orden]);

    const [repuestos] = await db.query(`
      SELECT rep.id_repuesto, rep.nombre, rep.precio, ore.cantidad
      FROM orden_repuestos ore
      JOIN repuestos rep ON ore.id_repuesto = rep.id_repuesto
      WHERE ore.id_orden = ?
    `, [orden.id_orden]);

    orden.reparaciones = reparaciones;
    orden.repuestos_usados = repuestos;
  }

  return ordenesBase;
},

create: async (orden) => {
  const [result] = await db.query('INSERT INTO ordenes SET ?', orden);
  return result.insertId;
},
};