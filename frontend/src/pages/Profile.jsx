import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ACTIVITY_LEVELS, GENDERS } from '../utils/constants';
import { getBmiCategory } from '../utils/format';
import Message from '../components/Message';

function Profile() {
  const { currentUser, updateUser } = useAuth();
  const { refreshGoals, refreshTips } = useData();

  const [values, setValues] = useState({
    name: currentUser.name,
    age: currentUser.age ?? '',
    weight: currentUser.weight ?? '',
    height: currentUser.height ?? '',
    gender: currentUser.gender,
    activityLevel: currentUser.activityLevel,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const bmiCategory = getBmiCategory(currentUser.bmi);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateUser({
        name: values.name.trim(),
        age: values.age === '' ? null : Number(values.age),
        weight: values.weight === '' ? null : Number(values.weight),
        height: values.height === '' ? null : Number(values.height),
        gender: values.gender,
        activityLevel: values.activityLevel,
      });

      // el peso y el nivel de actividad cambian el avance de las metas y los consejos
      await Promise.all([refreshGoals(), refreshTips()]);
      setSuccess('Perfil actualizado');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section>
      <div className="section-head">
        <h1 className="section-head__title">Mi perfil</h1>
        <p className="section-head__subtitle">
          Estos datos ajustan el calculo del IMC, las calorias estimadas y los consejos.
        </p>
      </div>

      <div className="profile">
        <div className="card profile__summary">
          <div className="profile__identity">
            <span className="profile__avatar" aria-hidden="true">
              {currentUser.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <h2 className="profile__name">{currentUser.name}</h2>
              <p className="profile__email">{currentUser.email}</p>
            </div>
          </div>

          <div className="profile__bmi">
            <p className="profile__bmi-label">Indice de masa corporal</p>
            <p className="profile__bmi-value">{currentUser.bmi ?? '--'}</p>
            {bmiCategory ? (
              <span className={`badge badge_${bmiCategory.modifier}`}>{bmiCategory.label}</span>
            ) : (
              <p className="profile__bmi-hint">
                Anade tu peso y tu altura para calcular el IMC.
              </p>
            )}
          </div>
        </div>

        <form className="card form" onSubmit={handleSubmit}>
          <div className="form__field">
            <label className="form__label" htmlFor="name">
              Nombre
            </label>
            <input
              className="form__input"
              id="name"
              name="name"
              type="text"
              minLength={2}
              maxLength={30}
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__row">
            <div className="form__field">
              <label className="form__label" htmlFor="age">
                Edad
              </label>
              <input
                className="form__input"
                id="age"
                name="age"
                type="number"
                min="10"
                max="120"
                placeholder="30"
                value={values.age}
                onChange={handleChange}
              />
            </div>

            <div className="form__field">
              <label className="form__label" htmlFor="gender">
                Sexo
              </label>
              <select
                className="form__select"
                id="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
              >
                {GENDERS.map((gender) => (
                  <option key={gender.value} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form__row">
            <div className="form__field">
              <label className="form__label" htmlFor="weight">
                Peso (kg)
              </label>
              <input
                className="form__input"
                id="weight"
                name="weight"
                type="number"
                min="20"
                max="400"
                step="0.1"
                placeholder="72"
                value={values.weight}
                onChange={handleChange}
              />
            </div>

            <div className="form__field">
              <label className="form__label" htmlFor="height">
                Altura (cm)
              </label>
              <input
                className="form__input"
                id="height"
                name="height"
                type="number"
                min="100"
                max="250"
                placeholder="175"
                value={values.height}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="activityLevel">
              Nivel de actividad
            </label>
            <select
              className="form__select"
              id="activityLevel"
              name="activityLevel"
              value={values.activityLevel}
              onChange={handleChange}
            >
              {ACTIVITY_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label} — {level.description}
                </option>
              ))}
            </select>
          </div>

          <Message text={error} />
          <Message text={success} type="success" />

          <button className="button button_primary" type="submit" disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
