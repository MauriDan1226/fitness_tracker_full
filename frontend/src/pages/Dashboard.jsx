import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { buildWeeklySeries, buildWeightSeries, getStreak, getWeekWorkouts, summarize } from '../utils/stats';
import { formatDuration, formatNumber, getBmiCategory } from '../utils/format';
import StatCard from '../components/StatCard';
import WeightChart from '../components/WeightChart';
import ActivityChart from '../components/ActivityChart';
import WorkoutCard from '../components/WorkoutCard';
import ProgressBar from '../components/ProgressBar';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Icon from '../components/Icon';

function Dashboard() {
  const { currentUser } = useAuth();
  const { workouts, goals, tips, isLoading, loadError } = useData();

  const totals = useMemo(() => summarize(workouts), [workouts]);
  const weekTotals = useMemo(() => summarize(getWeekWorkouts(workouts)), [workouts]);
  const weeklySeries = useMemo(() => buildWeeklySeries(workouts), [workouts]);
  const weightSeries = useMemo(() => buildWeightSeries(currentUser), [currentUser]);
  const streak = useMemo(() => getStreak(workouts), [workouts]);

  const recentWorkouts = workouts.slice(0, 3);
  const activeGoals = goals.slice(0, 3);
  const bmiCategory = getBmiCategory(currentUser.bmi);
  const featuredTip = tips[0];

  if (isLoading) {
    return <Loader text="Preparando tu panel..." />;
  }

  return (
    <section className="dashboard">
      <div className="dashboard__greeting">
        <h1 className="dashboard__title">Hola, {currentUser.name}</h1>
        <p className="section-head__subtitle">
          {weekTotals.count > 0
            ? `Llevas ${weekTotals.count} sesiones esta semana. Sigue asi.`
            : 'Todavia no has entrenado esta semana. Buen momento para empezar.'}
        </p>
      </div>

      <Message text={loadError} />

      <div className="dashboard__stats">
        <StatCard
          label="Entrenamientos"
          value={formatNumber(totals.count)}
          hint={`${weekTotals.count} esta semana`}
          tone="accent"
        />
        <StatCard
          label="Minutos activos"
          value={formatDuration(weekTotals.minutes)}
          hint={`${formatDuration(totals.minutes)} en total`}
        />
        <StatCard
          label="Calorias semanales"
          value={formatNumber(weekTotals.calories)}
          hint={`${formatNumber(totals.calories)} kcal acumuladas`}
          tone="energy"
        />
        <StatCard
          label="Indice de masa corporal"
          value={currentUser.bmi ?? '--'}
          hint={bmiCategory ? bmiCategory.label : 'Completa peso y altura'}
          tone="water"
        />
      </div>

      <div className="dashboard__charts">
        <ActivityChart data={weeklySeries} />
        <WeightChart data={weightSeries} />
      </div>

      <div className="dashboard__panels">
        <div className="card">
          <div className="dashboard__panel-head">
            <h2 className="dashboard__panel-title">Ultimos entrenamientos</h2>
            <Link to="/workouts" className="button button_ghost button_small">
              Ver todos
            </Link>
          </div>

          {recentWorkouts.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon"><Icon name="running" size={28} /></span>
              <p className="empty-state__text">
                Aun no hay sesiones registradas. Anota la primera para empezar tu historial.
              </p>
              <Link to="/workouts" className="button button_primary">
                Registrar entrenamiento
              </Link>
            </div>
          ) : (
            <div className="workout-list">
              {recentWorkouts.map((workout) => (
                <WorkoutCard key={workout._id} workout={workout} />
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="dashboard__panel-head">
            <h2 className="dashboard__panel-title">Metas en curso</h2>
            <Link to="/goals" className="button button_ghost button_small">
              Ver todas
            </Link>
          </div>

          {activeGoals.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon"><Icon name="target" size={28} /></span>
              <p className="empty-state__text">Define una meta y sigue tu avance desde aqui.</p>
              <Link to="/goals" className="button button_primary">
                Crear meta
              </Link>
            </div>
          ) : (
            <ul className="dashboard__goal-list">
              {activeGoals.map((goal) => (
                <li key={goal._id} className="dashboard__goal">
                  <div className="dashboard__goal-row">
                    <span>{goal.title}</span>
                    <span className="dashboard__goal-percent tabular">
                      {Math.round(goal.progress.percent)}%
                    </span>
                  </div>
                  <ProgressBar percent={goal.progress.percent} />
                </li>
              ))}
            </ul>
          )}

          {streak > 0 && (
            <p className="dashboard__streak">
              <Icon name="flame" size={15} />
              Racha actual: {streak} {streak === 1 ? 'dia' : 'dias'} seguidos
            </p>
          )}
        </div>
      </div>

      {featuredTip && (
        <article className="tips__featured dashboard__tip">
          <span className="badge badge_accent">Consejo del dia</span>
          <h2 className="tips__featured-title">{featuredTip.title}</h2>
          <p className="tips__featured-text">{featuredTip.text}</p>
          <Link to="/tips" className="button button_secondary button_small">
            Ver mas consejos
          </Link>
        </article>
      )}
    </section>
  );
}

export default Dashboard;
