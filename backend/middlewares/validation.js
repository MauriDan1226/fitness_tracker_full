const { celebrate, Joi, Segments } = require('celebrate');
const { GENDERS, ACTIVITY_LEVELS } = require('../utils/constants');

const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': 'El nombre es obligatorio',
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede superar los 30 caracteres',
      'any.required': 'El nombre es obligatorio',
    }),
    email: Joi.string().required().email().messages({
      'string.empty': 'El correo es obligatorio',
      'string.email': 'El formato del correo no es valido',
      'any.required': 'El correo es obligatorio',
    }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'La contrasena es obligatoria',
      'string.min': 'La contrasena debe tener al menos 8 caracteres',
      'any.required': 'La contrasena es obligatoria',
    }),
  }),
});

const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'El correo es obligatorio',
      'string.email': 'El formato del correo no es valido',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'La contrasena es obligatoria',
    }),
  }),
});

const validateProfileUpdate = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      age: Joi.number().min(10).max(120).allow(null),
      weight: Joi.number().min(20).max(400).allow(null),
      height: Joi.number().min(100).max(250).allow(null),
      gender: Joi.string().valid(...GENDERS),
      activityLevel: Joi.string().valid(...ACTIVITY_LEVELS),
    })
    .min(1)
    .messages({
      'object.min': 'Debes enviar al menos un campo para actualizar',
    }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateProfileUpdate,
};
