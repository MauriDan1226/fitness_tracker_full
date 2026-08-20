const mongoose = require('mongoose');
const { WORKOUT_TYPES } = require('../utils/constants');

const workoutSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      // se consulta siempre por usuario, conviene indexarlo
      index: true,
    },
    type: {
      type: String,
      required: [true, 'El tipo de ejercicio es obligatorio'],
      enum: {
        values: WORKOUT_TYPES,
        message: 'Tipo de ejercicio no valido',
      },
    },
    // duracion en minutos
    duration: {
      type: Number,
      required: [true, 'La duracion es obligatoria'],
      min: [1, 'La duracion minima es 1 minuto'],
      max: [1440, 'La duracion maxima es 1440 minutos'],
    },
    calories: {
      type: Number,
      required: [true, 'Las calorias son obligatorias'],
      min: [0, 'Las calorias no pueden ser negativas'],
      max: [20000, 'Valor de calorias fuera de rango'],
    },
    date: {
      type: Date,
      required: [true, 'La fecha es obligatoria'],
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: [300, 'Las notas no pueden superar los 300 caracteres'],
      trim: true,
      default: '',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('workout', workoutSchema);
