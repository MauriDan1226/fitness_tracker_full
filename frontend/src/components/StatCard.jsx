function StatCard({ label, value, hint, tone = 'default' }) {
  return (
    <article className="card stat-card">
      <p className="stat-card__label">{label}</p>
      <p className={`stat-card__value ${tone !== 'default' ? `stat-card__value_${tone}` : ''}`}>
        {value}
      </p>
      {hint && <p className="stat-card__hint">{hint}</p>}
    </article>
  );
}

export default StatCard;
