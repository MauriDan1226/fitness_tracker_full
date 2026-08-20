import { Link } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, HERO, SECTION_IMAGES } from '../config/branding';
import BrandImage from '../components/BrandImage';

const FEATURES = [
  {
    image: SECTION_IMAGES.first,
    title: 'Registra cada entrenamiento',
    text: 'Tipo de ejercicio, duracion, calorias y fecha. Todo tu historial en un mismo sitio.',
  },
  {
    image: SECTION_IMAGES.second,
    title: 'Ponte metas reales',
    text: 'Define objetivos de peso, minutos o calorias y sigue el avance con barras de progreso.',
  },
  {
    image: SECTION_IMAGES.third,
    title: 'Mide tu evolucion',
    text: 'Graficas de peso y actividad para ver si vas por buen camino semana a semana.',
  },
];

function Landing() {
  return (
    <div className="landing">
      <section className="landing__hero">
        <div>
          <span className="landing__eyebrow">Entrena con datos</span>
          <h1 className="landing__title">
            Tu progreso, <span className="landing__title-accent">medido de verdad</span>
          </h1>
          {/* TODO: el nombre y el lema salen de branding.js */}
          <p className="landing__tagline">
            {APP_NAME} es tu cuaderno de entrenamiento digital. {APP_TAGLINE}
          </p>
          <div className="landing__actions">
            <Link to="/signup" className="button button_primary">
              Empezar gratis
            </Link>
            <Link to="/signin" className="button button_secondary">
              Ya tengo cuenta
            </Link>
          </div>
          <ul className="landing__metrics">
            <li>
              <p className="landing__metric-value">10</p>
              <p className="landing__metric-label">tipos de ejercicio</p>
            </li>
            <li>
              <p className="landing__metric-value">4</p>
              <p className="landing__metric-label">clases de meta</p>
            </li>
            <li>
              <p className="landing__metric-value">100%</p>
              <p className="landing__metric-label">datos privados</p>
            </li>
          </ul>
        </div>
        {/* TODO: sustituir la imagen de portada en branding.js */}
        <BrandImage image={HERO} ratio="4 / 3" />
      </section>

      <section className="landing__features">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="card card_interactive">
            {/* TODO: sustituir las imagenes de seccion en branding.js */}
            <BrandImage image={feature.image} className="landing__feature-image" ratio="3 / 2" />
            <h2 className="landing__feature-title">{feature.title}</h2>
            <p className="landing__feature-text">{feature.text}</p>
          </article>
        ))}
      </section>

      <section className="landing__cta">
        <h2 className="landing__cta-title">Empieza hoy, no el lunes</h2>
        <p className="landing__cta-text">
          Crea tu cuenta, anota tu primera sesion y deja que los numeros hagan el resto.
        </p>
        <Link to="/signup" className="button button_primary">
          Crear mi cuenta
        </Link>
      </section>
    </div>
  );
}

export default Landing;
