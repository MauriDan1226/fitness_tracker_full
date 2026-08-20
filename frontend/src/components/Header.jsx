import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME, LOGO } from '../config/branding';
import { useAuth } from '../contexts/AuthContext';
import BrandImage from './BrandImage';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Panel' },
  { to: '/workouts', label: 'Entrenamientos' },
  { to: '/goals', label: 'Metas' },
  { to: '/tips', label: 'Consejos' },
  { to: '/profile', label: 'Perfil' },
];

function Header() {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // el menu movil se cierra al cambiar de pagina
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to={isLoggedIn ? '/dashboard' : '/'} className="header__logo">
          {/* TODO: al asignar el logo en branding.js esta imagen deja de ser un marcador */}
          <BrandImage image={LOGO} className="header__logo-image" ratio="1 / 1" />
          <span>{APP_NAME}</span>
        </Link>

        <button
          className="header__toggle"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
          <span className="header__toggle-bar" />
        </button>

        <div className={`header__menu ${isMenuOpen ? 'header__menu_open' : ''}`}>
          {isLoggedIn && (
            <nav className="header__nav">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `header__link ${isActive ? 'header__link_active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          )}

          <div className="header__user">
            {isLoggedIn ? (
              <>
                <span className="header__username">{currentUser.name}</span>
                <button
                  className="button button_secondary button_small"
                  type="button"
                  onClick={handleLogout}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="button button_ghost button_small">
                  Iniciar sesion
                </Link>
                <Link to="/signup" className="button button_primary button_small">
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
