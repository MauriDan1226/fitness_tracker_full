import { useData } from '../contexts/DataContext';
import TipCard from '../components/TipCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

function Tips() {
  const { tips, isLoading, loadError } = useData();
  const [featured, ...rest] = tips;

  return (
    <section>
      <div className="section-head">
        <h1 className="section-head__title">Consejos para ti</h1>
        <p className="section-head__subtitle">
          Recomendaciones elegidas segun tu perfil y tu actividad de esta semana.
        </p>
      </div>

      <Message text={loadError} />

      {isLoading ? (
        <Loader text="Buscando consejos..." />
      ) : tips.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">💡</span>
          <p className="empty-state__text">
            Completa tu perfil y registra alguna sesion para recibir consejos personalizados.
          </p>
        </div>
      ) : (
        <>
          <article className="tips__featured">
            <span className="badge badge_accent">{featured.category}</span>
            <h2 className="tips__featured-title">{featured.title}</h2>
            <p className="tips__featured-text">{featured.text}</p>
          </article>

          <div className="tips__grid">
            {rest.map((tip) => (
              <TipCard key={tip.id} tip={tip} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Tips;
