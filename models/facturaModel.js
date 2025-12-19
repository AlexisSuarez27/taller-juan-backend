const db = require('../config/db');

exports.getAll = async (desde, hasta) => {
  let query = `
    SELECT 
      o.id_orden, 
      o.fecha, 
      o.nombre_equipo, 
      o.marca, 
      o.modelo,
      o.comentario_tecnico,
      c.nombre AS cliente_nombre, 
      c.cedula,
      c.telefono,
      c.correo
    FROM ordenes o
    JOIN clientes c ON o.id_cliente = c.id_cliente
    WHERE o.estado = 'Finalizada'
  `;
  const params = [];

  if (desde) {
    query += ' AND DATE(o.fecha) >= ?';
    params.push(desde);
  }
  if (hasta) {
    query += ' AND DATE(o.fecha) <= ?';
    params.push(hasta);
  }

  query += ' ORDER BY o.fecha DESC';

  const [facturasBase] = await db.query(query, params);

  const facturasCompletas = [];
  for (let factura of facturasBase) {
    const [reparaciones] = await db.query(`
      SELECT r.nombre, r.precio_mano_obra
      FROM orden_reparaciones ore
      JOIN reparaciones r ON ore.id_reparacion = r.id_reparacion
      WHERE ore.id_orden = ?
    `, [factura.id_orden]);

    const [repuestos] = await db.query(`
      SELECT rep.nombre, rep.precio, ore.cantidad
      FROM orden_repuestos ore
      JOIN repuestos rep ON ore.id_repuesto = rep.id_repuesto
      WHERE ore.id_orden = ?
    `, [factura.id_orden]);

    const totalManoObra = reparaciones.reduce((sum, r) => sum + parseFloat(r.precio_mano_obra || 0), 0);
    const totalRepuestos = repuestos.reduce((sum, r) => sum + (parseFloat(r.precio || 0) * (r.cantidad || 1)), 0);
    const totalGeneral = totalManoObra + totalRepuestos;

    if (reparaciones.length > 0 || repuestos.length > 0) {
      facturasCompletas.push({
        id_orden: factura.id_orden,
        fecha: factura.fecha,
        cliente_nombre: factura.cliente_nombre,
        cedula: factura.cedula,
        telefono: factura.telefono || null,
        correo: factura.correo || null,
        nombre_equipo: factura.nombre_equipo || 'Venta de repuestos',
        ...(factura.marca ? { marca: factura.marca } : {}),
        ...(factura.modelo ? { modelo: factura.modelo } : {}),
        comentario_tecnico: factura.comentario_tecnico || null,
        reparaciones,
        repuestos_usados: repuestos,
        total_mano_obra: totalManoObra.toFixed(2),
        total_repuestos: totalRepuestos.toFixed(2),
        total_general: totalGeneral.toFixed(2)
      });
    }
  }

  return facturasCompletas;
};

exports.getById = async (id_orden) => {
  const [facturaBase] = await db.query(`
    SELECT 
      o.id_orden, o.fecha, o.nombre_equipo, o.marca, o.modelo, o.comentario_tecnico,
      c.nombre AS cliente_nombre, c.cedula, c.telefono, c.correo
    FROM ordenes o
    JOIN clientes c ON o.id_cliente = c.id_cliente
    WHERE o.id_orden = ? AND o.estado = 'Finalizada'
  `, [id_orden]);

  if (!facturaBase[0]) {
    return null;
  }

  const [reparaciones] = await db.query(`
    SELECT r.nombre, r.precio_mano_obra
    FROM orden_reparaciones ore
    JOIN reparaciones r ON ore.id_reparacion = r.id_reparacion
    WHERE ore.id_orden = ?
  `, [id_orden]);

  const [repuestos] = await db.query(`
    SELECT rep.nombre, rep.precio, ore.cantidad
    FROM orden_repuestos ore
    JOIN repuestos rep ON ore.id_repuesto = rep.id_repuesto
    WHERE ore.id_orden = ?
  `, [id_orden]);

  const totalManoObra = reparaciones.reduce((sum, r) => sum + parseFloat(r.precio_mano_obra || 0), 0);
  const totalRepuestos = repuestos.reduce((sum, r) => sum + (parseFloat(r.precio || 0) * (r.cantidad || 1)), 0);
  const totalGeneral = totalManoObra + totalRepuestos;

  return {
    ...facturaBase[0],
    nombre_equipo: facturaBase[0].nombre_equipo || 'Venta de repuestos',
    ...(facturaBase[0].marca ? { marca: facturaBase[0].marca } : {}),
    ...(facturaBase[0].modelo ? { modelo: facturaBase[0].modelo } : {}),
    reparaciones,
    repuestos_usados: repuestos,
    total_mano_obra: totalManoObra.toFixed(2),
    total_repuestos: totalRepuestos.toFixed(2),
    total_general: totalGeneral.toFixed(2)
  };
};