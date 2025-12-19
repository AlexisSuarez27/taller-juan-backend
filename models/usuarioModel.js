const db = require('../config/db');

module.exports = {
  findByUsername: async (usuario) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    return rows[0];
  }
};