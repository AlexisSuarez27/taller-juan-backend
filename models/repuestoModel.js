const db = require('../config/db');

module.exports = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM repuestos ORDER BY nombre');
    return rows;
  },

  updateStock: async (id_repuesto, cantidad) => {
    await db.query('UPDATE repuestos SET stock = stock - ? WHERE id_repuesto = ?', [cantidad, id_repuesto]);
  },

  checkStock: async (id_repuesto, cantidad = 1) => {
    const [rows] = await db.query('SELECT stock FROM repuestos WHERE id_repuesto = ?', [id_repuesto]);
    return rows[0]?.stock >= cantidad;
  }
};