/*
 * Muestra una imagen de marca. Si todavia no hay archivo asignado en branding.js
 * pinta un marcador gris con el texto alternativo, para que se vea que falta el asset.
 * Cuando la imagen trae una version vertical (`mobileSrc`) el navegador elige
 * la mas adecuada segun el ancho de la pantalla.
 */
function BrandImage({
  image,
  className = '',
  ratio = '16 / 9',
  mobileRatio,
  loading = 'lazy',
  fill = false,
}) {
  const { src, mobileSrc, alt } = image;

  if (!src) {
    return (
      <div
        className={`brand-image brand-image_placeholder ${className}`.trim()}
        style={{ aspectRatio: fill ? undefined : ratio }}
        role="img"
        aria-label={alt}
      >
        <span className="brand-image__label">{alt}</span>
      </div>
    );
  }

  const picture = (
    <img
      className={`brand-image ${className}`.trim()}
      style={{ aspectRatio: fill || mobileSrc ? undefined : ratio }}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
    />
  );

  if (!mobileSrc) return picture;

  return (
    <picture
      className={`brand-image__picture ${className}`.trim()}
      style={fill ? undefined : { '--ratio-desktop': ratio, '--ratio-mobile': mobileRatio || ratio }}
    >
      <source media="(max-width: 700px)" srcSet={mobileSrc} />
      <img
        className={`brand-image ${fill ? 'brand-image_fill' : 'brand-image_responsive'}`}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
      />
    </picture>
  );
}

export default BrandImage;
