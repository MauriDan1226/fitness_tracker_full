// Etiquetas visibles de cada tipo de ejercicio. Las claves coinciden con el enum del backend.
// El valor MET sirve para estimar las calorias a partir del peso y la duracion.
export const WORKOUT_TYPES = [
  { value: 'running', label: 'Correr', icon: '🏃', met: 9.8 },
  { value: 'weights', label: 'Pesas', icon: '🏋️', met: 5 },
  { value: 'cycling', label: 'Ciclismo', icon: '🚴', met: 7.5 },
  { value: 'swimming', label: 'Natacion', icon: '🏊', met: 8.3 },
  { value: 'yoga', label: 'Yoga', icon: '🧘', met: 3 },
  { value: 'walking', label: 'Caminar', icon: '🚶', met: 3.5 },
  { value: 'hiit', label: 'HIIT', icon: '🔥', met: 8 },
  { value: 'football', label: 'Futbol', icon: '⚽', met: 7 },
  { value: 'dance', label: 'Baile', icon: '💃', met: 5.5 },
  { value: 'other', label: 'Otro', icon: '⭐', met: 4 },
];

export const GOAL_TYPES = [
  { value: 'weight', label: 'Peso objetivo', unit: 'kg' },
  { value: 'weekly_minutes', label: 'Minutos por semana', unit: 'min' },
  { value: 'weekly_calories', label: 'Calorias por semana', unit: 'kcal' },
  { value: 'weekly_workouts', label: 'Entrenamientos por semana', unit: 'sesiones' },
];

export const GENDERS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },
  { value: 'otro', label: 'Prefiero no decirlo' },
];

export const ACTIVITY_LEVELS = [
  { value: 'sedentario', label: 'Sedentario', description: 'Poco o nada de ejercicio' },
  { value: 'ligero', label: 'Ligero', description: '1 o 2 dias por semana' },
  { value: 'moderado', label: 'Moderado', description: '3 o 4 dias por semana' },
  { value: 'activo', label: 'Activo', description: '5 o 6 dias por semana' },
  { value: 'muy activo', label: 'Muy activo', description: 'Todos los dias o doble sesion' },
];

export const findWorkoutType = (value) =>
  WORKOUT_TYPES.find((type) => type.value === value) || WORKOUT_TYPES[WORKOUT_TYPES.length - 1];

export const findGoalType = (value) =>
  GOAL_TYPES.find((type) => type.value === value) || GOAL_TYPES[0];
