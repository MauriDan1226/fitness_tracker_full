import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { WORKOUT_TYPES, findWorkoutType } from '../utils/constants';
import { estimateCalories, fromInputDate, toInputDate } from '../utils/format';
import Message from './Message';

const emptyWorkout = {
  type: 'running',
  duration: '',
  calories: '',
  date: toInputDate(new Date()),
  notes: '',
};

function WorkoutForm({ workout, onSubmit, onCancel, isSaving, error }) {
  const { currentUser } = useAuth();
  const [values, setValues] = useState(() =>
    workout
      ? {
          type: workout.type,
          duration: String(workout.duration),
          calories: String(workout.calories),
          date: toInputDate(workout.date),
          notes: workout.notes || '',
        }
      : emptyWorkout,
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  // calcula una cifra orientativa a partir del peso del perfil y el MET del ejercicio
  const handleEstimate = () => {
    const estimated = estimateCalories({
      met: findWorkoutType(values.type).met,
      weight: currentUser.weight,
      minutes: Number(values.duration),
    });

    if (estimated) {
      setValues((current) => ({ ...current, calories: String(estimated) }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      type: values.type,
      duration: Number(values.duration),
      calories: Number(values.calories),
      date: fromInputDate(values.date).toISOString(),
      notes: values.notes.trim(),
    });
  };

  const canEstimate = Boolean(currentUser.weight && Number(values.duration) > 0);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__field">
        <label className="form__label" htmlFor="type">
          Tipo de ejercicio
        </label>
        <select
          className="form__select"
          id="type"
          name="type"
          value={values.type}
          onChange={handleChange}
          required
        >
          {WORKOUT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form__row">
        <div className="form__field">
          <label className="form__label" htmlFor="duration">
            Duracion (minutos)
          </label>
          <input
            className="form__input"
            id="duration"
            name="duration"
            type="number"
            min="1"
            max="1440"
            placeholder="45"
            value={values.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="date">
            Fecha
          </label>
          <input
            className="form__input"
            id="date"
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="calories">
          Calorias quemadas
        </label>
        <div className="form__input-group">
          <input
            className="form__input"
            id="calories"
            name="calories"
            type="number"
            min="0"
            max="20000"
            placeholder="420"
            value={values.calories}
            onChange={handleChange}
            required
          />
          <button
            className="button button_secondary button_small"
            type="button"
            onClick={handleEstimate}
            disabled={!canEstimate}
          >
            Estimar
          </button>
        </div>
        <span className="form__hint">
          {canEstimate
            ? 'La estimacion usa tu peso y la intensidad media del ejercicio.'
            : 'Anade tu peso en el perfil e indica la duracion para estimar las calorias.'}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="notes">
          Notas (opcional)
        </label>
        <textarea
          className="form__textarea"
          id="notes"
          name="notes"
          maxLength={300}
          placeholder="Sensaciones, series, ritmo..."
          value={values.notes}
          onChange={handleChange}
        />
      </div>

      <Message text={error} />

      <div className="form__actions">
        <button className="button button_secondary" type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="button button_primary" type="submit" disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}

export default WorkoutForm;
