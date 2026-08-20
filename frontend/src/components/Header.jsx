import { Link } from 'react-router-dom';
import { APP_NAME, LOGO } from '../config/branding';
import BrandImage from './BrandImage';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          {/* TODO: al asignar el logo en branding.js esta imagen deja de ser un marcador */}
          <BrandImage image={LOGO} className="header__logo-image" ratio="1 / 1" />
          <span>{APP_NAME}</span>
        </Link>
        <div className="header__user">
          <Link to="/signin" className="button button_ghost button_small">
            Iniciar sesion
          </Link>
          <Link to="/signup" className="button button_primary button_small">
            Crear cuenta
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
