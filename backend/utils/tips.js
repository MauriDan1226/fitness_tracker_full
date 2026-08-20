// Banco de consejos. Cada consejo decide si aplica al contexto del usuario
// (perfil + actividad de la semana) y tiene una prioridad para ordenarlos.
const TIPS = [
  {
    id: 'complete-profile',
    category: 'perfil',
    title: 'Completa tu perfil',
    text: 'Anade tu peso y tu altura en el perfil para calcular tu IMC y ajustar los consejos a tu situacion.',
    priority: 100,
    matches: ({ user }) => !user.weight || !user.height,
  },
  {
    id: 'first-workout',
    category: 'inicio',
    title: 'Registra tu primer entrenamiento',
    text: 'Empieza con algo sencillo: 20 minutos de caminata rapida ya cuentan. Lo importante es crear el habito.',
    priority: 95,
    matches: ({ totals }) => totals.count === 0,
  },
  {
    id: 'bmi-low',
    category: 'nutricion',
    title: 'Tu IMC esta por debajo del rango habitual',
    text: 'Prioriza el trabajo de fuerza y un aporte calorico suficiente. Si el peso sigue bajando, consultalo con un profesional de la salud.',
    priority: 90,
    matches: ({ bmi }) => bmi !== null && bmi < 18.5,
  },
  {
    id: 'bmi-high',
    category: 'nutricion',
    title: 'Combina cardio y fuerza',
    text: 'Tu IMC esta por encima del rango habitual. Alternar sesiones de cardio con dos dias de fuerza a la semana ayuda a mejorar la composicion corporal.',
    priority: 90,
    matches: ({ bmi }) => bmi !== null && bmi >= 25,
  },
  {
    id: 'bmi-normal',
    category: 'nutricion',
    title: 'Manten el ritmo',
    text: 'Tu IMC esta dentro del rango habitual. Sostener la rutina actual y cuidar el descanso es la mejor forma de conservarlo.',
    priority: 40,
    matches: ({ bmi }) => bmi !== null && bmi >= 18.5 && bmi < 25,
  },
  {
    id: 'sedentary',
    category: 'habitos',
    title: 'Rompe el sedentarismo',
    text: 'Si pasas muchas horas sentado, levantate cinco minutos cada hora. Ese pequeno gasto acumulado pesa mas de lo que parece.',
    priority: 80,
    matches: ({ user }) => user.activityLevel === 'sedentario',
  },
  {
    id: 'weekly-minutes-low',
    category: 'actividad',
    title: 'Apunta a 150 minutos semanales',
    text: 'La recomendacion general es de 150 minutos de actividad moderada por semana. Reparte el tiempo que te falta en sesiones cortas de 20 o 30 minutos.',
    priority: 75,
    matches: ({ weekly }) => weekly.minutes < 150,
  },
  {
    id: 'weekly-minutes-high',
    category: 'actividad',
    title: 'Buen volumen semanal',
    text: 'Ya superas los 150 minutos de actividad esta semana. Manten al menos un dia de descanso completo para que el cuerpo asimile el trabajo.',
    priority: 60,
    matches: ({ weekly }) => weekly.minutes >= 150,
  },
  {
    id: 'no-strength',
    category: 'entrenamiento',
    title: 'Suma trabajo de fuerza',
    text: 'No has registrado sesiones de fuerza. Dos dias por semana de pesas o ejercicios con tu propio peso protegen articulaciones y masa muscular.',
    priority: 70,
    matches: ({ typesUsed, totals }) => totals.count > 0 && !typesUsed.includes('weights'),
  },
  {
    id: 'variety',
    category: 'entrenamiento',
    title: 'Varia los estimulos',
    text: 'Casi todos tus registros son del mismo tipo de ejercicio. Alternar disciplinas reduce el riesgo de lesion y evita el estancamiento.',
    priority: 65,
    matches: ({ typesUsed, totals }) => totals.count >= 4 && typesUsed.length === 1,
  },
  {
    id: 'long-sessions',
    category: 'entrenamiento',
    title: 'Cuida la recuperacion',
    text: 'Tus sesiones son largas. Dedica diez minutos al enfriamiento y a la movilidad al terminar: la recuperacion forma parte del entrenamiento.',
    priority: 55,
    matches: ({ totals }) => totals.count > 0 && totals.minutes / totals.count > 75,
  },
  {
    id: 'streak-break',
    category: 'habitos',
    title: 'Vuelve a la rutina',
    text: 'Llevas la semana sin registros. Una sesion corta hoy vale mas que un plan perfecto que empieza el lunes.',
    priority: 85,
    matches: ({ weekly, totals }) => totals.count > 0 && weekly.count === 0,
  },
  {
    id: 'hydration',
    category: 'salud',
    title: 'Bebe agua durante el dia',
    text: 'Reparte la ingesta a lo largo de la jornada y no esperes a tener sed, sobre todo los dias de entrenamiento intenso.',
    priority: 30,
    matches: () => true,
  },
  {
    id: 'sleep',
    category: 'salud',
    title: 'Duerme entre siete y nueve horas',
    text: 'El descanso es cuando el cuerpo adapta el trabajo del entrenamiento. Dormir poco frena el progreso mas que saltarse una sesion.',
    priority: 28,
    matches: () => true,
  },
  {
    id: 'progressive-overload',
    category: 'entrenamiento',
    title: 'Progresa poco a poco',
    text: 'Sube el volumen semanal como maximo un diez por ciento. Los saltos bruscos son la causa mas comun de lesiones por sobreuso.',
    priority: 25,
    matches: ({ totals }) => totals.count >= 3,
  },
  {
    id: 'warmup',
    category: 'entrenamiento',
    title: 'No te saltes el calentamiento',
    text: 'Cinco o diez minutos de movilidad y cardio suave preparan el cuerpo y mejoran el rendimiento de la sesion.',
    priority: 20,
    matches: () => true,
  },
];

// Devuelve los consejos que aplican al contexto, ordenados por relevancia
const selectTips = (context, limit = 4) =>
  TIPS.filter((tip) => tip.matches(context))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit)
    .map(({ id, category, title, text }) => ({ id, category, title, text }));

module.exports = { TIPS, selectTips };
