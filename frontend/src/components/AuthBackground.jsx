import { AUTH_BACKGROUND } from '../config/branding';

// Fotografia ambiental detras del formulario, decorativa: no lleva texto alternativo
function AuthBackground() {
  return (
    <div className="auth__background" aria-hidden="true">
      <img src={AUTH_BACKGROUND.src} alt="" loading="eager" decoding="async" />
    </div>
  );
}

export default AuthBackground;
