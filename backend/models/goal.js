const mongoose = require('mongoose');
const { GOAL_TYPES } = require('../utils/constants');

const goalSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'El titulo de la meta es obligatorio'],
      minlength: [2, 'El titulo debe tener al menos 2 caracteres'],
      maxlength: [60, 'El titulo no puede superar los 60 caracteres'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'El tipo de meta es obligatorio'],
      enum: {
        values: GOAL_TYPES,
        message: 'Tipo de meta no valido',
      },
    },
    // valor objetivo: kg para peso, minutos, calorias o numero de sesiones
    target: {
      type: Number,
      required: [true, 'El valor objetivo es obligatorio'],
      min: [1, 'El valor objetivo debe ser mayor que cero'],
    },
    // punto de partida, se usa para calcular el progreso de las metas de peso
    startValue: {
      type: Number,
      default: null,
    },
    deadline: {
      type: Date,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('goal', goalSchema);
