/*
 * Muestra una imagen de marca. Si todavia no hay archivo asignado en branding.js
 * pinta un marcador gris con el texto alternativo, para que se vea que falta el asset.
 */
function BrandImage({ image, className = '', ratio = '16 / 9' }) {
  const { src, alt } = image;

  if (!src) {
    return (
      <div
        className={`brand-image brand-image_placeholder ${className}`.trim()}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={alt}
      >
        <span className="brand-image__label">{alt}</span>
      </div>
    );
  }

  return (
    <img
      className={`brand-image ${className}`.trim()}
      style={{ aspectRatio: ratio }}
      src={src}
      alt={alt}
    />
  );
}

export default BrandImage;
