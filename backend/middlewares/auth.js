const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');

const { JWT_SECRET = 'dev-secret' } = process.env;

// Comprueba el token del encabezado Authorization y deja el id del usuario en req.user
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Se requiere autorizacion'));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('El token no es valido o ha expirado'));
  }

  return next();
};
