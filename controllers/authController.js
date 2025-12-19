const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usuarioModel = require('../models/usuarioModel');
require('dotenv').config();

exports.login = async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const user = await usuarioModel.findByUsername(usuario);
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { id: user.id_usuario, rol: user.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, rol: user.rol });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ msg: 'Server error' });
  }
};