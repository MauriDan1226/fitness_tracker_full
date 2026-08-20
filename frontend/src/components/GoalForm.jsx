import { useState } from 'react';
import { GOAL_TYPES, findGoalType } from '../utils/constants';
import { fromInputDate, toInputDate } from '../utils/format';
import Message from './Message';

const emptyGoal = {
  title: '',
  type: 'weekly_minutes',
  target: '',
  deadline: '',
};

function GoalForm({ goal, onSubmit, onCancel, isSaving, error }) {
  const [values, setValues] = useState(() =>
    goal
      ? {
          title: goal.title,
          type: goal.type,
          target: String(goal.target),
          deadline: goal.deadline ? toInputDate(goal.deadline) : '',
        }
      : emptyGoal,
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title: values.title.trim(),
      type: values.type,
      target: Number(values.target),
      deadline: values.deadline ? fromInputDate(values.deadline).toISOString() : null,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__field">
        <label className="form__label" htmlFor="title">
          Nombre de la meta
        </label>
        <input
          className="form__input"
          id="title"
          name="title"
          type="text"
          minLength={2}
          maxLength={60}
          placeholder="Correr 20 km este mes"
          value={values.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="goal-type">
          Tipo de meta
        </label>
        <select
          className="form__select"
          id="goal-type"
          name="type"
          value={values.type}
          onChange={handleChange}
          required
        >
          {GOAL_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <span className="form__hint">
          {values.type === 'weight'
            ? 'El avance se mide desde tu peso actual hasta el objetivo.'
            : 'El avance se reinicia cada lunes con la actividad de la semana.'}
        </span>
      </div>

      <div className="form__row">
        <div className="form__field">
          <label className="form__label" htmlFor="target">
            Objetivo ({findGoalType(values.type).unit})
          </label>
          <input
            className="form__input"
            id="target"
            name="target"
            type="number"
            min="1"
            step="any"
            placeholder="150"
            value={values.target}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="deadline">
            Fecha limite (opcional)
          </label>
          <input
            className="form__input"
            id="deadline"
            name="deadline"
            type="date"
            value={values.deadline}
            onChange={handleChange}
          />
        </div>
      </div>

      <Message text={error} />

      <div className="form__actions">
        <button className="button button_secondary" type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="button button_primary" type="submit" disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar meta'}
        </button>
      </div>
    </form>
  );
}

export default GoalForm;
