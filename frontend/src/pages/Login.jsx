import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from '../utils/useForm';
import Message from '../components/Message';
import AuthBackground from '../components/AuthBackground';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { values, errors, isValid, handleChange } = useForm({ email: '', password: '' });
  const [serverError, setServerError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');
    setIsSaving(true);

    try {
      await login(values);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Hola de nuevo</h1>
        <p className="auth__subtitle">Entra para seguir con tu plan de entrenamiento.</p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__field">
            <label className="form__label" htmlFor="email">
              Correo electronico
            </label>
            <input
              className={`form__input ${errors.email ? 'form__input_invalid' : ''}`}
              id="email"
              name="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={values.email}
              onChange={handleChange}
              required
            />
            <span className="form__error">{errors.email}</span>
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="password">
              Contrasena
            </label>
            <input
              className={`form__input ${errors.password ? 'form__input_invalid' : ''}`}
              id="password"
              name="password"
              type="password"
              placeholder="Tu contrasena"
              value={values.password}
              onChange={handleChange}
              required
            />
            <span className="form__error">{errors.password}</span>
          </div>

          <Message text={serverError} />

          <button
            className="button button_primary button_block"
            type="submit"
            disabled={!isValid || isSaving}
          >
            {isSaving ? 'Entrando...' : 'Iniciar sesion'}
          </button>
        </form>

        <p className="auth__footer">
          No tienes cuenta?{' '}
          <Link to="/signup" className="auth__link">
            Registrate
          </Link>
        </p>
      </div>

      <AuthBackground title="Tu cuaderno te espera" text="Cada sesion que anotas afina las estadisticas y el avance de tus metas." />
    </section>
  );
}

export default Login;
