// Devuelve el lunes a las 00:00 de la semana a la que pertenece la fecha dada
const getWeekStart = (date = new Date()) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? 6 : day - 1; // el domingo cuenta como ultimo dia de la semana
  start.setDate(start.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

const getWeekEnd = (date = new Date()) => {
  const end = getWeekStart(date);
  end.setDate(end.getDate() + 7);
  return end;
};

// Totales de una lista de entrenamientos
const summarize = (workouts) =>
  workouts.reduce(
    (acc, workout) => ({
      count: acc.count + 1,
      minutes: acc.minutes + workout.duration,
      calories: acc.calories + workout.calories,
    }),
    { count: 0, minutes: 0, calories: 0 },
  );

const filterByWeek = (workouts, reference = new Date()) => {
  const start = getWeekStart(reference);
  const end = getWeekEnd(reference);
  return workouts.filter((workout) => {
    const date = new Date(workout.date);
    return date >= start && date < end;
  });
};

module.exports = {
  getWeekStart,
  getWeekEnd,
  summarize,
  filterByWeek,
};
