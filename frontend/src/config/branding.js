/*
 * Datos de marca de la aplicacion.
 *
 * TODO: reemplazar APP_TAGLINE por el lema definitivo.
 * Las imagenes viven en `frontend/public/images`. Si un `src` vuelve a ser null,
 * el componente BrandImage pinta un marcador gris con el texto alternativo.
 */

export const APP_NAME = 'IRONNOTE';

// TODO: reemplazar por el lema real de la aplicacion
export const APP_TAGLINE = 'Registra cada sesion, mide tu progreso y cumple tus metas.';

// Marca vectorial: se ve nitida en cualquier tamano, del favicon a la cabecera
export const LOGO = {
  src: '/images/logo.svg',
  alt: 'Simbolo de la aplicacion: barras de progreso ascendentes con una linea de pulso',
};

// Portada de la landing: panoramica en escritorio, vertical en pantallas estrechas
export const HERO = {
  src: '/images/hero-wide.jpg',
  mobileSrc: '/images/hero-portrait.jpg',
  alt: 'Mujer descansando entre series en un gimnasio en penumbra',
};

// Banda a sangre que cierra la landing
export const CLOSING_IMAGE = {
  src: '/images/closing.jpg',
  alt: 'Corredor esprintando a contraluz en una pista al atardecer',
};

// Cabecera de la seccion de consejos
export const TIPS_IMAGE = {
  src: '/images/tips.jpg',
  alt: 'Deportista recuperando el aliento apoyado en una pared',
};

// Ilustra la lista de entrenamientos cuando aun no hay ninguno
export const EMPTY_LOG_IMAGE = {
  src: '/images/empty-log.jpg',
  alt: 'Cuaderno abierto y reloj deportivo sobre un banco de madera',
};

// Panel lateral de las pantallas de registro e inicio de sesion
export const AUTH_BACKGROUND = {
  src: '/images/auth-aside.jpg',
  alt: 'Deportista recuperando el aliento tras entrenar',
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
