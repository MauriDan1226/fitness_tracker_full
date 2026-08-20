import { useData } from '../contexts/DataContext';
import { TIPS_IMAGE } from '../config/branding';
import BrandImage from '../components/BrandImage';
import TipCard from '../components/TipCard';
import Loader from '../components/Loader';
import Icon from '../components/Icon';
import Message from '../components/Message';

function Tips() {
  const { tips, isLoading, loadError } = useData();
  const [featured, ...rest] = tips;

  return (
    <section>
      <header className="page-hero">
        <div className="page-hero__media">
          <BrandImage image={TIPS_IMAGE} fill loading="eager" />
        </div>
        <div className="page-hero__body">
          <p className="eyebrow">Salud y habitos</p>
          <h1 className="page-hero__title">Consejos para ti</h1>
          <p className="page-hero__text">
            Elegidos segun tu perfil y tu actividad de esta semana.
          </p>
        </div>
      </header>

      <Message text={loadError} />

      {isLoading ? (
        <Loader text="Buscando consejos..." />
      ) : tips.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon"><Icon name="bulb" size={28} /></span>
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
