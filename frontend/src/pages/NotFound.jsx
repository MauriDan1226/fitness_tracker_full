import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>
      <h1>Esta pagina no existe</h1>
      <p className="empty-state__text">
        El enlace que has seguido no lleva a ninguna parte. Vuelve al inicio y sigue entrenando.
      </p>
      <Link to="/" className="button button_primary">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;
