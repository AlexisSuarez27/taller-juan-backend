const db = require('../config/db');

module.exports = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM clientes');
    return rows;
  },
  create: async (cliente) => {
    const [result] = await db.query('INSERT INTO clientes SET ?', cliente);
    return result.insertId;
  },
  findByCedula: async (cedula) => {
    const [rows] = await db.query('SELECT * FROM clientes WHERE cedula = ?', [cedula]);
    return rows[0];
  }
};