require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const {
  PORT = 4000,
  MONGO_URI = 'mongodb://127.0.0.1:27017/fitness_tracker',
  CLIENT_ORIGIN = '*',
} = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN === '*' ? true : CLIENT_ORIGIN.split(',') }));
app.use(express.json());
app.use(limiter);

// Comprobacion rapida de que el servidor responde
app.get('/', (req, res) => {
  res.send({ message: 'Fitness tracker API' });
});

app.use(routes);

// manejador central de errores
app.use(errorHandler);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Conectado a MongoDB: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('No se pudo conectar a MongoDB:', err.message);
    process.exit(1);
  });
