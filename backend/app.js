require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const { PORT = 3001, MONGO_URI = 'mongodb://127.0.0.1:27017/fitness_tracker' } = process.env;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Comprobacion rapida de que el servidor responde
app.get('/', (req, res) => {
  res.send({ message: 'Fitness tracker API' });
});

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
