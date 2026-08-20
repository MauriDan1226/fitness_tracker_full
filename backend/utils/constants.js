// Tipos de ejercicio admitidos. El frontend traduce cada clave a su etiqueta visible.
const WORKOUT_TYPES = [
  'running',
  'weights',
  'cycling',
  'swimming',
  'yoga',
  'walking',
  'hiit',
  'football',
  'dance',
  'other',
];

// Tipos de meta admitidos
const GOAL_TYPES = [
  'weight',
  'weekly_minutes',
  'weekly_calories',
  'weekly_workouts',
];

const GENDERS = ['masculino', 'femenino', 'otro'];

const ACTIVITY_LEVELS = ['sedentario', 'ligero', 'moderado', 'activo', 'muy activo'];

module.exports = {
  WORKOUT_TYPES,
  GOAL_TYPES,
  GENDERS,
  ACTIVITY_LEVELS,
};
