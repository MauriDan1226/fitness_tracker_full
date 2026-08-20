import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from '../utils/useForm';
import Message from '../components/Message';
import AuthBackground from '../components/AuthBackground';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { values, errors, isValid, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');
    setIsSaving(true);

    try {
      await register(values);
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
        <h1 className="auth__title">Crea tu cuenta</h1>
        <p className="auth__subtitle">Empieza a registrar tus entrenamientos hoy mismo.</p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__field">
            <label className="form__label" htmlFor="name">
              Nombre
            </label>
            <input
              className={`form__input ${errors.name ? 'form__input_invalid' : ''}`}
              id="name"
              name="name"
              type="text"
              placeholder="Como quieres que te llamemos"
              value={values.name}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              required
            />
            <span className="form__error">{errors.name}</span>
          </div>

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
              placeholder="Minimo 8 caracteres"
              value={values.password}
              onChange={handleChange}
              minLength={8}
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
            {isSaving ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="auth__footer">
          Ya tienes cuenta?{' '}
          <Link to="/signin" className="auth__link">
            Inicia sesion
          </Link>
        </p>
      </div>

      <AuthBackground title="Empieza por el principio" text="Una cuenta, tus datos y el primer entrenamiento. El resto lo calcula la aplicacion." />
    </section>
  );
}

export default Register;
