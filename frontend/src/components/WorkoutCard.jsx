import { findWorkoutType } from '../utils/constants';
import { formatDate, formatDuration, formatNumber } from '../utils/format';
import Icon from './Icon';

function WorkoutCard({ workout, onEdit, onDelete }) {
  const type = findWorkoutType(workout.type);

  return (
    <article className="card card_interactive workout-card">
      <span className="workout-card__icon">
        <Icon name={type.icon} size={22} />
      </span>

      <div className="workout-card__body">
        <h3 className="workout-card__title">
          {type.label}
          <span className="workout-card__date">{formatDate(workout.date)}</span>
        </h3>
        <p className="workout-card__meta">
          <span className="workout-card__stat">
            <Icon name="clock" size={15} />
            <span className="tabular">{formatDuration(workout.duration)}</span>
          </span>
          <span className="workout-card__stat">
            <Icon name="flame" size={15} />
            <span className="tabular">{formatNumber(workout.calories)} kcal</span>
          </span>
        </p>
        {workout.notes && <p className="workout-card__notes">{workout.notes}</p>}
      </div>

      {onEdit && onDelete && (
        <div className="card-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => onEdit(workout)}
            aria-label={`Editar ${type.label}`}
            title="Editar"
          >
            <Icon name="edit" size={16} />
          </button>
          <button
            className="icon-button icon-button_danger"
            type="button"
            onClick={() => onDelete(workout)}
            aria-label={`Eliminar ${type.label}`}
            title="Eliminar"
          >
            <Icon name="trash" size={16} />
          </button>
        </div>
      )}
    </article>
  );
}

export default WorkoutCard;
