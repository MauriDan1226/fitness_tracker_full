import { findGoalType } from '../utils/constants';
import { formatDate, formatNumber } from '../utils/format';
import ProgressBar from './ProgressBar';

function GoalCard({ goal, onEdit, onDelete }) {
  const type = findGoalType(goal.type);
  const { current, percent, unit } = goal.progress;
  const isComplete = percent >= 100;

  return (
    <article className={`card goal-card ${isComplete ? 'goal-card_completed' : ''}`}>
      <div className="goal-card__head">
        <div>
          <h3 className="goal-card__title">{goal.title}</h3>
          <p className="goal-card__type">{type.label}</p>
        </div>
        {isComplete && <span className="badge badge_accent">Conseguida</span>}
      </div>

      <div className="goal-card__values">
        <p className="goal-card__current">
          {formatNumber(current)} <span className="goal-card__target">/ {formatNumber(goal.target)} {unit}</span>
        </p>
        <p className="goal-card__percent">{Math.round(percent)}%</p>
      </div>

      <ProgressBar percent={percent} />

      <div className="goal-card__footer">
        <span className="goal-card__deadline">
          {goal.deadline ? `Hasta el ${formatDate(goal.deadline)}` : 'Sin fecha limite'}
        </span>
        <span className="workout-card__actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => onEdit(goal)}
            aria-label={`Editar ${goal.title}`}
            title="Editar"
          >
            ✎
          </button>
          <button
            className="icon-button icon-button_danger"
            type="button"
            onClick={() => onDelete(goal)}
            aria-label={`Eliminar ${goal.title}`}
            title="Eliminar"
          >
            🗑
          </button>
        </span>
      </div>
    </article>
  );
}

export default GoalCard;
