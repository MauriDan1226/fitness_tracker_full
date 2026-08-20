// Formato corto de fecha: 14 mar 2026
export const formatDate = (value) =>
  new Date(value).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

// Formato para el eje de las graficas: 14 mar
export const formatShortDate = (value) =>
  new Date(value).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

// Valor listo para un input de tipo date
export const toInputDate = (value) => new Date(value).toISOString().slice(0, 10);

export const formatNumber = (value) => new Intl.NumberFormat('es-ES').format(Math.round(value));

// Convierte minutos a un texto del tipo "1 h 20 min"
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
};

// Clasificacion del IMC segun los rangos habituales
export const getBmiCategory = (bmi) => {
  if (bmi === null || bmi === undefined) return null;
  if (bmi < 18.5) return { label: 'Bajo peso', modifier: 'low' };
  if (bmi < 25) return { label: 'Peso normal', modifier: 'normal' };
  if (bmi < 30) return { label: 'Sobrepeso', modifier: 'high' };
  return { label: 'Obesidad', modifier: 'very-high' };
};

// Estimacion de calorias: MET x peso en kg x horas
export const estimateCalories = ({ met, weight, minutes }) => {
  if (!met || !weight || !minutes) return null;
  return Math.round(met * weight * (minutes / 60));
};
