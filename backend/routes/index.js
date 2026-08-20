const router = require('express').Router();
const { validateSignup, validateSignin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors');

const userRouter = require('./users');

// rutas publicas
router.post('/users/signup', validateSignup, createUser);
router.post('/users/signin', validateSignin, login);

// rutas protegidas
router.use('/users', userRouter);

router.use((req, res, next) => {
  next(new NotFoundError('No se ha encontrado el recurso solicitado'));
});

module.exports = router;
