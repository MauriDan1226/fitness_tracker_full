import Icon from './Icon';

function TipCard({ tip }) {
  return (
    <article className="card tip-card">
      <span className="eyebrow tip-card__category">
        <Icon name="bulb" size={14} />
        {tip.category}
      </span>
      <h3 className="tip-card__title">{tip.title}</h3>
      <p className="tip-card__text">{tip.text}</p>
    </article>
  );
}

export default TipCard;
