# IRONNOTE

Aplicación web de seguimiento fitness. Permite registrar entrenamientos, definir metas
personales, seguir el progreso con gráficas y recibir consejos de salud adaptados al perfil
de cada usuario. Cada persona solo ve y gestiona sus propios datos.

## Funcionalidades

- Registro e inicio de sesión con JWT guardado en `localStorage`.
- Perfil con edad, peso, altura, sexo y nivel de actividad, con cálculo automático del IMC.
- CRUD completo de entrenamientos: tipo de ejercicio, duración, calorías y fecha.
- Estimación de calorías a partir del peso del perfil y la intensidad media del ejercicio.
- Metas de peso, minutos semanales, calorías semanales o número de sesiones, con barra de
  progreso y porcentaje calculados en el servidor.
- Panel con estadísticas, gráfica de evolución del peso y gráfica de actividad semanal.
- Sección de consejos de salud elegidos según el perfil y la actividad de la semana.
- Rutas protegidas en el cliente y en la API.

## Stack

| Capa | Tecnologías |
| --- | --- |
| Frontend | React 18, Vite, JavaScript (JSX), CSS puro, React Router, Recharts |
| Backend | Node.js, Express, Mongoose |
| Base de datos | MongoDB |
| Autenticación | JSON Web Token, bcrypt |
| Validación | celebrate / Joi |

## Estructura del repositorio

```
fitness_tracker_full/
├── backend/
│   ├── controllers/      lógica de usuarios, entrenamientos, metas y consejos
│   ├── models/           esquemas de Mongoose (User, Workout, Goal)
│   ├── routes/           definición de las rutas REST
│   ├── middlewares/      autorización JWT, validación y manejo de errores
│   ├── utils/            constantes, errores, estadísticas y banco de consejos
│   ├── app.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   componentes reutilizables
│   │   ├── pages/        pantallas de la aplicación
│   │   ├── config/       branding.js (nombre e imágenes de la marca)
│   │   ├── contexts/     contextos de autenticación y de datos
│   │   ├── utils/        cliente de la API, formatos y estadísticas
│   │   ├── styles/       hojas de estilo
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## Requisitos

- Node.js 18 o superior
- MongoDB en local o una cadena de conexión de MongoDB Atlas

## Instalación

El backend y el frontend son proyectos independientes y se instalan por separado.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

La API queda escuchando en `http://localhost:4000`.

### 2. Frontend

En otra terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

El cliente queda disponible en `http://localhost:5173`.

## Variables de entorno

### backend/.env

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `PORT` | Puerto de la API | `4000` |
| `MONGO_URI` | Cadena de conexión a MongoDB | `mongodb://127.0.0.1:27017/fitness_tracker` |
| `JWT_SECRET` | Clave para firmar los tokens | cadena larga y aleatoria |
| `CLIENT_ORIGIN` | Origen o lista de orígenes permitidos por CORS | `http://localhost:5173` |

### frontend/.env

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `VITE_API_URL` | URL base de la API | `http://localhost:4000` |

Los archivos `.env` no se suben al repositorio; cada entorno parte de su `.env.example`.

## Scripts

### Backend

| Comando | Descripción |
| --- | --- |
| `npm start` | Arranca el servidor |
| `npm run dev` | Arranca el servidor con recarga automática |

### Frontend

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila la versión de producción en `dist/` |
| `npm run preview` | Sirve la compilación de producción |
| `npm run lint` | Revisa el código con ESLint |

## API

Todas las rutas devuelven JSON. Las protegidas necesitan la cabecera
`Authorization: Bearer <token>`.

| Método | Ruta | Protegida | Descripción |
| --- | --- | --- | --- |
| POST | `/users/signup` | No | Crea una cuenta y devuelve el token |
| POST | `/users/signin` | No | Inicia sesión y devuelve el token |
| GET | `/users/me` | Sí | Datos del usuario, incluido el IMC |
| PATCH | `/users/me` | Sí | Actualiza el perfil y guarda el historial de peso |
| GET | `/workouts` | Sí | Lista los entrenamientos del usuario |
| POST | `/workouts` | Sí | Crea un entrenamiento |
| GET | `/workouts/:id` | Sí | Devuelve un entrenamiento |
| PATCH | `/workouts/:id` | Sí | Edita un entrenamiento |
| DELETE | `/workouts/:id` | Sí | Elimina un entrenamiento |
| GET | `/goals` | Sí | Lista las metas con su progreso |
| POST | `/goals` | Sí | Crea una meta |
| PATCH | `/goals/:id` | Sí | Edita una meta |
| DELETE | `/goals/:id` | Sí | Elimina una meta |
| GET | `/tips` | Sí | Consejos según el perfil y la actividad |

Los errores se devuelven con el código correspondiente (`400`, `401`, `403`, `404`, `409`,
`500`) y el formato `{ "message": "..." }`.

## Personalización de la marca

Los textos e imágenes de marca están centralizados en
[`frontend/src/config/branding.js`](frontend/src/config/branding.js).

| Constante | Estado | Uso |
| --- | --- | --- |
| `APP_NAME` | listo | Nombre de la aplicación |
| `APP_TAGLINE` | pendiente | Lema de la portada |
| `LOGO` | listo | Símbolo vectorial de la cabecera y del favicon |
| `HERO` | listo | Portada de la landing, con versión vertical para móvil |
| `AUTH_BACKGROUND` | listo | Fondo de registro e inicio de sesión |
| `SECTION_IMAGES` | listo | Imágenes de las tres secciones de la landing |

Las imágenes viven en `frontend/public/images/`:

| Archivo | Formato | Uso |
| --- | --- | --- |
| `logo.svg` | SVG | Marca; escala sin pérdida y usa el color de acento |
| `hero.jpg` | 2304 × 1728 | Portada en escritorio |
| `hero-portrait.jpg` | 1728 × 2304 | Portada en pantallas de menos de 700 px |
| `auth-background.jpg` | 2560 × 1440 | Fondo de las pantallas de acceso |
| `feature-log.jpg` | 2496 × 1664 | Sección "Registra cada entrenamiento" |
| `feature-goals.jpg` | 2496 × 1664 | Sección "Ponte metas reales" |
| `feature-progress.jpg` | 2496 × 1664 | Sección "Mide tu evolución" |

El componente `BrandImage` sirve la versión vertical mediante `<picture>` cuando la imagen
define `mobileSrc`, y sigue pintando un marcador gris con el texto alternativo si algún
`src` vuelve a quedar en `null`. Para sustituir cualquier imagen basta con dejar el archivo
nuevo en `frontend/public/images/` y apuntar su `src` en `branding.js`.

El título de la pestaña vive en `frontend/index.html`.
