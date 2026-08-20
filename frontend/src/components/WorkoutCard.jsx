import { findWorkoutType } from '../utils/constants';
import { formatDate, formatDuration, formatNumber } from '../utils/format';

function WorkoutCard({ workout, onEdit, onDelete }) {
  const type = findWorkoutType(workout.type);

  return (
    <article className="card card_interactive workout-card">
      <span className="workout-card__icon" aria-hidden="true">
        {type.icon}
      </span>

      <div className="workout-card__body">
        <h3 className="workout-card__title">
          {type.label}
          <span className="workout-card__date">{formatDate(workout.date)}</span>
        </h3>
        <p className="workout-card__meta">
          <span>⏱ {formatDuration(workout.duration)}</span>
          <span>🔥 {formatNumber(workout.calories)} kcal</span>
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
            ✎
          </button>
          <button
            className="icon-button icon-button_danger"
            type="button"
            onClick={() => onDelete(workout)}
            aria-label={`Eliminar ${type.label}`}
            title="Eliminar"
          >
            🗑
          </button>
        </div>
      )}
    </article>
  );
}

export default WorkoutCard;
