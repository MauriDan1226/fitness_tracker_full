const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [30, 'El nombre no puede superar los 30 caracteres'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'El formato del correo no es valido',
      },
    },
    password: {
      type: String,
      required: [true, 'La contrasena es obligatoria'],
      minlength: [8, 'La contrasena debe tener al menos 8 caracteres'],
      // nunca se devuelve en las consultas salvo que se pida de forma explicita
      select: false,
    },
    age: {
      type: Number,
      min: [10, 'La edad minima es 10 anos'],
      max: [120, 'La edad maxima es 120 anos'],
      default: null,
    },
    // peso en kilogramos
    weight: {
      type: Number,
      min: [20, 'El peso minimo es 20 kg'],
      max: [400, 'El peso maximo es 400 kg'],
      default: null,
    },
    // altura en centimetros
    height: {
      type: Number,
      min: [100, 'La altura minima es 100 cm'],
      max: [250, 'La altura maxima es 250 cm'],
      default: null,
    },
    gender: {
      type: String,
      enum: {
        values: ['masculino', 'femenino', 'otro'],
        message: 'Sexo no valido',
      },
      default: 'otro',
    },
    // cada cambio de peso del perfil deja una entrada para dibujar la evolucion
    weightHistory: [
      {
        value: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        _id: false,
      },
    ],
    activityLevel: {
      type: String,
      enum: {
        values: ['sedentario', 'ligero', 'moderado', 'activo', 'muy activo'],
        message: 'Nivel de actividad no valido',
      },
      default: 'sedentario',
    },
  },
  { timestamps: true },
);

// El IMC se calcula a partir del peso y la altura guardados en el perfil
userSchema.virtual('bmi').get(function getBmi() {
  if (!this.weight || !this.height) return null;
  const heightInMeters = this.height / 100;
  return Number((this.weight / (heightInMeters * heightInMeters)).toFixed(1));
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('user', userSchema);
