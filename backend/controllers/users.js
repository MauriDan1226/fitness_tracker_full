const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require('../utils/errors');

const { JWT_SECRET = 'dev-secret' } = process.env;
const TOKEN_EXPIRATION = '7d';

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('Ya existe un usuario registrado con ese correo');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    // se firma el token al registrarse para entrar directo a la aplicacion
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    const { password: _omit, ...safeUser } = user.toObject();
    res.status(201).send({ token, user: safeUser });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Correo o contrasena incorrectos');
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Correo o contrasena incorrectos');
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    const { password: _omit, ...safeUser } = user.toObject();
    res.send({ token, user: safeUser });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('No se ha encontrado el usuario');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, age, weight, height, gender, activityLevel } = req.body;

    // solo se actualizan los campos que llegan en la peticion
    const updates = { name, age, weight, height, gender, activityLevel };
    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) delete updates[key];
    });

    if (Object.keys(updates).length === 0) {
      throw new BadRequestError('Debes enviar al menos un campo para actualizar');
    }

    const current = await User.findById(req.user._id);
    if (!current) {
      throw new NotFoundError('No se ha encontrado el usuario');
    }

    // solo se anade una entrada al historial cuando el peso cambia de verdad
    const operation = { $set: updates };
    if (updates.weight && updates.weight !== current.weight) {
      operation.$push = { weightHistory: { value: updates.weight, date: new Date() } };
    }

    const user = await User.findByIdAndUpdate(req.user._id, operation, {
      new: true,
      runValidators: true,
    });

    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
