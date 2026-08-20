import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <section className="dashboard">
      <div className="dashboard__greeting">
        <h1 className="section-head__title">Hola, {currentUser.name}</h1>
        <p className="section-head__subtitle">Este es el resumen de tu actividad.</p>
      </div>

      <div className="empty-state">
        <span className="empty-state__icon">🏁</span>
        <p className="empty-state__text">
          Completa tu perfil y registra tu primer entrenamiento para empezar a ver tus
          estadisticas.
        </p>
        <Link to="/profile" className="button button_primary">
          Ir a mi perfil
        </Link>
      </div>
    </section>
  );
}

export default Dashboard;
