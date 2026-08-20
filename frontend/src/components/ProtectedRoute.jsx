import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';

/*
 * Envuelve las rutas que dependen de la sesion.
 * Con `anonymous` hace lo contrario: manda al panel a quien ya ha iniciado sesion.
 */
function ProtectedRoute({ children, anonymous = false }) {
  const { isLoggedIn, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return <Loader text="Comprobando tu sesion..." />;
  }

  if (anonymous) {
    return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
  }

  return isLoggedIn ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;
