// Errores con codigo de estado propio para que el manejador central sepa que responder
class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class BadRequestError extends HttpError {
  constructor(message = 'Los datos enviados no son validos') {
    super(message, 400);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = 'Se requiere autorizacion') {
    super(message, 401);
  }
}

class ForbiddenError extends HttpError {
  constructor(message = 'No tienes permiso para realizar esta accion') {
    super(message, 403);
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'El recurso solicitado no existe') {
    super(message, 404);
  }
}

class ConflictError extends HttpError {
  constructor(message = 'El recurso ya existe') {
    super(message, 409);
  }
}

module.exports = {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
