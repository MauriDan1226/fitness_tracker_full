function TipCard({ tip }) {
  return (
    <article className="card card_interactive tip-card">
      <span className="badge">{tip.category}</span>
      <h3 className="tip-card__title">{tip.title}</h3>
      <p className="tip-card__text">{tip.text}</p>
    </article>
  );
}

export default TipCard;
