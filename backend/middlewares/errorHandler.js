const { isCelebrateError } = require('celebrate');

// Manejador central de errores: cualquier next(err) termina aqui
module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Se ha producido un error en el servidor';

  // celebrate agrupa los fallos de validacion por segmento (body, params, query)
  if (isCelebrateError(err)) {
    const [firstSegment] = [...err.details.values()];
    statusCode = 400;
    message = firstSegment.details.map((detail) => detail.message).join('. ');
  }

  // errores propios de mongoose que conviene traducir a 400 / 409
  if (err.name === 'ValidationError' && err.errors) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join('. ');
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'El identificador enviado no es valido';
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Ya existe un usuario registrado con ese correo';
  }

  if (statusCode === 500) {
    console.error(err);
    message = 'Se ha producido un error en el servidor';
  }

  res.status(statusCode).send({ message });
};
