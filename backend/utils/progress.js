const { filterByWeek, summarize } = require('./stats');

const clamp = (value) => Math.max(0, Math.min(100, value));

// Calcula el avance de una meta segun su tipo.
// Las metas semanales miran solo los entrenamientos de la semana en curso;
// la meta de peso compara el peso actual con el punto de partida.
const calculateProgress = (goal, { workouts = [], currentWeight = null } = {}) => {
  const weekly = summarize(filterByWeek(workouts));

  let current = 0;
  let percent = 0;
  let unit = '';

  switch (goal.type) {
    case 'weekly_minutes':
      current = weekly.minutes;
      unit = 'min';
      percent = clamp((current / goal.target) * 100);
      break;

    case 'weekly_calories':
      current = weekly.calories;
      unit = 'kcal';
      percent = clamp((current / goal.target) * 100);
      break;

    case 'weekly_workouts':
      current = weekly.count;
      unit = 'sesiones';
      percent = clamp((current / goal.target) * 100);
      break;

    case 'weight': {
      current = currentWeight ?? goal.startValue ?? 0;
      unit = 'kg';
      const start = goal.startValue ?? currentWeight;

      if (!start || !currentWeight) {
        percent = 0;
        break;
      }

      const total = Math.abs(start - goal.target);
      if (total === 0) {
        percent = 100;
        break;
      }

      const advanced = Math.abs(start - currentWeight);
      // si el peso se aleja del objetivo el avance vuelve a cero
      const movingTowardsTarget =
        (goal.target < start && currentWeight <= start) ||
        (goal.target > start && currentWeight >= start);

      percent = movingTowardsTarget ? clamp((advanced / total) * 100) : 0;
      break;
    }

    default:
      percent = 0;
  }

  return {
    current: Number(current.toFixed(1)),
    percent: Number(percent.toFixed(1)),
    unit,
  };
};

module.exports = { calculateProgress };
