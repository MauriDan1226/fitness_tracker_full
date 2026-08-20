/*
 * Datos de marca de la aplicacion.
 *
 * TODO: reemplazar APP_NAME y APP_TAGLINE por los definitivos.
 * Las imagenes viven en `frontend/public/images`. Si un `src` vuelve a ser null,
 * el componente BrandImage pinta un marcador gris con el texto alternativo.
 */

// TODO: reemplazar por el nombre real de la aplicacion
export const APP_NAME = '[TÍTULO_APP]';

// TODO: reemplazar por el lema real de la aplicacion
export const APP_TAGLINE = 'Registra cada sesion, mide tu progreso y cumple tus metas.';

// Marca vectorial: se ve nitida en cualquier tamano, del favicon a la cabecera
export const LOGO = {
  src: '/images/logo.svg',
  alt: 'Simbolo de la aplicacion: barras de progreso ascendentes con una linea de pulso',
};

// Portada de la landing. La version vertical se usa en pantallas estrechas
export const HERO = {
  src: '/images/hero.jpg',
  mobileSrc: '/images/hero-portrait.jpg',
  alt: 'Mujer descansando entre series en un gimnasio en penumbra',
};

// Fondo de las pantallas de registro e inicio de sesion
export const AUTH_BACKGROUND = {
  src: '/images/auth-background.jpg',
  alt: 'Gimnasio vacio al amanecer',
};

// Imagenes de las tres secciones de la landing
export const SECTION_IMAGES = {
  first: {
    src: '/images/feature-log.jpg',
    alt: 'Manos anotando el entrenamiento en una libreta sobre un banco de gimnasio',
  },
  second: {
    src: '/images/feature-goals.jpg',
    alt: 'Corredor atandose las zapatillas en una calle mojada al amanecer',
  },
  third: {
    src: '/images/feature-progress.jpg',
    alt: 'Deportista consultando los datos de su reloj despues de entrenar',
  },
};
