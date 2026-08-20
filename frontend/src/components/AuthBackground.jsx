import { AUTH_BACKGROUND } from '../config/branding';

/*
 * Panel lateral de las pantallas de acceso. La fotografia es decorativa,
 * asi que va sin texto alternativo y oculta a los lectores de pantalla.
 */
function AuthBackground({ title, text }) {
  return (
    <aside className="auth__aside" aria-hidden="true">
      <img className="auth__aside-image" src={AUTH_BACKGROUND.src} alt="" decoding="async" />
      <div className="auth__aside-body">
        <p className="eyebrow">{title}</p>
        <p className="auth__aside-text">{text}</p>
      </div>
    </aside>
  );
}

export default AuthBackground;
