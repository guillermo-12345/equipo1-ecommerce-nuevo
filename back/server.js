const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoute');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const clientRoutes = require('./routes/clientRoutes');
const profileRoutes = require('./routes/profileRoutes');
const emailRoutes = require('./routes/emailRoutes');
const purchaseRoutes = require('./routes/purchasesRoutes');
const { dbConnection } = require('./config/db');
require('dotenv').config();

// Inicializar express
const app = express();

// Middleware para manejo de CORS
const corsOptions = {
  origin: "https://equipo1-ecommerce-nuevo.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
};

app.use(cors(corsOptions));

// Encabezados para CORS (necesarios para navegadores estrictos)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://equipo1-ecommerce-nuevo.vercel.app"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Middleware de log de solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas CRUD
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/email', emailRoutes);

// Ruta inicial
app.get('/', (req, res) => res.send('Servidor corriendo...'));

// Middleware de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal. Intenta nuevamente.' });
});

// Conectar y sincronizar la base de datos
const port = process.env.PORT || 3001;

dbConnection.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});
