import { formatShortDate } from './format';

// Lunes a las 00:00 de la semana a la que pertenece la fecha
export const getWeekStart = (date = new Date()) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? 6 : day - 1;
  start.setDate(start.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const summarize = (workouts) =>
  workouts.reduce(
    (acc, workout) => ({
      count: acc.count + 1,
      minutes: acc.minutes + workout.duration,
      calories: acc.calories + workout.calories,
    }),
    { count: 0, minutes: 0, calories: 0 },
  );

export const getWeekWorkouts = (workouts, reference = new Date()) => {
  const start = getWeekStart(reference);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  return workouts.filter((workout) => {
    const date = new Date(workout.date);
    return date >= start && date < end;
  });
};

// Serie de las ultimas semanas para la grafica de actividad
export const buildWeeklySeries = (workouts, weeks = 8) => {
  const currentWeekStart = getWeekStart();

  return Array.from({ length: weeks }, (unused, index) => {
    const weekStart = new Date(currentWeekStart);
    weekStart.setDate(weekStart.getDate() - (weeks - 1 - index) * 7);
    const totals = summarize(getWeekWorkouts(workouts, weekStart));

    return {
      label: formatShortDate(weekStart),
      minutes: totals.minutes,
      calories: totals.calories,
    };
  });
};

// Serie de la evolucion del peso a partir del historial del perfil
export const buildWeightSeries = (user) => {
  const history = user.weightHistory || [];

  if (history.length === 0) {
    return user.weight ? [{ label: 'Hoy', weight: user.weight }] : [];
  }

  // si hay varios cambios en un mismo dia solo interesa el ultimo
  const byDay = new Map();
  history.forEach((entry) => {
    byDay.set(formatShortDate(entry.date), entry.value);
  });

  return [...byDay].map(([label, weight]) => ({ label, weight }));
};

// Dias seguidos con al menos un entrenamiento, contando desde hoy o desde ayer
export const getStreak = (workouts) => {
  if (workouts.length === 0) return 0;

  const days = new Set(
    workouts.map((workout) => {
      const date = new Date(workout.date);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    }),
  );

  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  // si hoy todavia no hay sesion, la racha puede venir desde ayer
  if (!days.has(cursor.getTime())) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(cursor.getTime())) return 0;
  }

  let streak = 0;
  while (days.has(cursor.getTime())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};
