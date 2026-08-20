import { Link } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, HERO, SECTION_IMAGES } from '../config/branding';
import BrandImage from '../components/BrandImage';

const FEATURES = [
  {
    image: SECTION_IMAGES.first,
    title: 'Anota la sesion, no la olvides',
    text: 'Tipo de ejercicio, duracion, calorias y fecha. Diez disciplinas, un historial que puedes filtrar y corregir cuando quieras.',
    detail: 'Registro',
  },
  {
    image: SECTION_IMAGES.second,
    title: 'Una meta que se mide sola',
    text: 'Peso objetivo, minutos, calorias o numero de sesiones. El avance se calcula en el servidor con tus datos reales, sin que tengas que hacer cuentas.',
    detail: 'Metas',
  },
  {
    image: SECTION_IMAGES.third,
    title: 'La evolucion, semana a semana',
    text: 'Peso, minutos activos y calorias en graficas limpias. Ves la tendencia, no un numero suelto de un dia cualquiera.',
    detail: 'Progreso',
  },
];

const METRICS = [
  { value: '10', label: 'disciplinas' },
  { value: '4', label: 'tipos de meta' },
  { value: '16', label: 'consejos segun tu perfil' },
];

function Landing() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero__media">
          <BrandImage image={HERO} fill loading="eager" />
        </div>

        <div className="hero__inner">
          <p className="eyebrow hero__eyebrow">{APP_NAME} · Cuaderno de entrenamiento</p>
          <h1 className="hero__title">
            Entrena.
            <br />
            Anota.
            <br />
            <span className="hero__title-accent">Comprueba.</span>
          </h1>
          <p className="hero__lead">{APP_TAGLINE}</p>

          <div className="hero__actions">
            <Link to="/signup" className="button button_primary">
              Crear mi cuenta
            </Link>
            <Link to="/signin" className="button button_secondary">
              Ya tengo cuenta
            </Link>
          </div>
        </div>

        <ul className="hero__metrics">
          {METRICS.map((metric) => (
            <li key={metric.label} className="hero__metric">
              <span className="hero__metric-value tabular">{metric.value}</span>
              <span className="hero__metric-label">{metric.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="features">
        <div className="features__intro">
          <p className="eyebrow">Que hace la aplicacion</p>
          <h2 className="features__heading">
            Tres cosas, bien hechas: registrar, medir y comparar.
          </h2>
        </div>

        {FEATURES.map((feature, index) => (
          <article key={feature.title} className="feature">
            <div className="feature__index">
              <span className="tabular">{String(index + 1).padStart(2, '0')}</span>
              <span className="feature__detail">{feature.detail}</span>
            </div>

            <div className="feature__body">
              <h3 className="feature__title">{feature.title}</h3>
              <p className="feature__text">{feature.text}</p>
            </div>

            <BrandImage image={feature.image} className="feature__image" ratio="3 / 2" />
          </article>
        ))}
      </section>

      <section className="closing">
        <h2 className="closing__title">Empieza hoy, no el lunes.</h2>
        <p className="closing__text">
          Crea la cuenta, anota la primera sesion y deja que los numeros hagan el resto.
        </p>
        <Link to="/signup" className="button button_primary">
          Crear mi cuenta
        </Link>
      </section>
    </div>
  );
}

export default Landing;
