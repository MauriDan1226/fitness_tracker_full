const { celebrate, Joi, Segments } = require('celebrate');
const {
  GENDERS,
  ACTIVITY_LEVELS,
  WORKOUT_TYPES,
  GOAL_TYPES,
} = require('../utils/constants');

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


const validateId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).messages({
      'string.hex': 'El identificador no es valido',
      'string.length': 'El identificador no es valido',
    }),
  }),
});

const validateWorkout = celebrate({
  [Segments.BODY]: Joi.object().keys({
    type: Joi.string()
      .required()
      .valid(...WORKOUT_TYPES)
      .messages({
        'any.only': 'Tipo de ejercicio no valido',
        'any.required': 'El tipo de ejercicio es obligatorio',
      }),
    duration: Joi.number().required().min(1).max(1440).messages({
      'number.base': 'La duracion debe ser un numero',
      'number.min': 'La duracion minima es 1 minuto',
      'number.max': 'La duracion maxima es 1440 minutos',
      'any.required': 'La duracion es obligatoria',
    }),
    calories: Joi.number().required().min(0).max(20000).messages({
      'number.base': 'Las calorias deben ser un numero',
      'number.min': 'Las calorias no pueden ser negativas',
      'any.required': 'Las calorias son obligatorias',
    }),
    date: Joi.date().messages({
      'date.base': 'La fecha no es valida',
    }),
    notes: Joi.string().allow('').max(300),
  }),
});

const validateWorkoutUpdate = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      type: Joi.string().valid(...WORKOUT_TYPES),
      duration: Joi.number().min(1).max(1440),
      calories: Joi.number().min(0).max(20000),
      date: Joi.date(),
      notes: Joi.string().allow('').max(300),
    })
    .min(1)
    .messages({
      'object.min': 'Debes enviar al menos un campo para actualizar',
    }),
});

const validateGoal = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(2).max(60).messages({
      'string.empty': 'El titulo de la meta es obligatorio',
      'string.min': 'El titulo debe tener al menos 2 caracteres',
      'string.max': 'El titulo no puede superar los 60 caracteres',
      'any.required': 'El titulo de la meta es obligatorio',
    }),
    type: Joi.string()
      .required()
      .valid(...GOAL_TYPES)
      .messages({
        'any.only': 'Tipo de meta no valido',
        'any.required': 'El tipo de meta es obligatorio',
      }),
    target: Joi.number().required().min(1).messages({
      'number.base': 'El valor objetivo debe ser un numero',
      'number.min': 'El valor objetivo debe ser mayor que cero',
      'any.required': 'El valor objetivo es obligatorio',
    }),
    startValue: Joi.number().allow(null),
    deadline: Joi.date().allow(null),
  }),
});

const validateGoalUpdate = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      title: Joi.string().min(2).max(60).messages({
        'string.min': 'El titulo debe tener al menos 2 caracteres',
        'string.max': 'El titulo no puede superar los 60 caracteres',
      }),
      type: Joi.string().valid(...GOAL_TYPES),
      target: Joi.number().min(1),
      startValue: Joi.number().allow(null),
      deadline: Joi.date().allow(null),
      completed: Joi.boolean(),
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
  validateId,
  validateWorkout,
  validateWorkoutUpdate,
  validateGoal,
  validateGoalUpdate,
};
