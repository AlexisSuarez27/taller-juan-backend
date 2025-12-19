const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const ordenRoutes = require('./routes/ordenRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const configRoutes = require('./routes/configRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');
const publicRoutes = require('./routes/publicRoutes');
const reparacionRoutes = require('./routes/reparacionRoutes');
const repuestoRoutes = require('./routes/repuestoRoutes');
const facturaRoutes = require('./routes/facturaRoutes');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/ordenes', ordenRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/config', configRoutes); 
app.use('/api/tecnico', tecnicoRoutes);
app.use('/api/public', publicRoutes); 
app.use('/api/reparaciones', reparacionRoutes);
app.use('/api/repuestos', repuestoRoutes); 
app.use('/api/facturas', facturaRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Backend del Taller Juan - API funcionando correctamente',
    fecha: new Date().toLocaleString()
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api`);
});