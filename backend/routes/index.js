const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors');

const userRouter = require('./users');
const workoutRouter = require('./workouts');
const goalRouter = require('./goals');
const tipRouter = require('./tips');

// rutas publicas
router.post('/users/signup', validateSignup, createUser);
router.post('/users/signin', validateSignin, login);

// rutas protegidas: a partir de aqui hace falta un token valido
router.use('/users', userRouter);
router.use('/workouts', auth, workoutRouter);
router.use('/goals', auth, goalRouter);
router.use('/tips', auth, tipRouter);

router.use((req, res, next) => {
  next(new NotFoundError('No se ha encontrado el recurso solicitado'));
});

module.exports = router;
