const Workout = require('../models/workout');
const { NotFoundError, ForbiddenError } = require('../utils/errors');

const getWorkouts = async (req, res, next) => {
  try {
    const filter = { owner: req.user._id };

    // filtro opcional por rango de fechas
    const { from, to } = req.query;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const workouts = await Workout.find(filter).sort({ date: -1 });
    res.send(workouts);
  } catch (err) {
    next(err);
  }
};

const getWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      throw new NotFoundError('No se ha encontrado el entrenamiento');
    }
    if (workout.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Este entrenamiento pertenece a otro usuario');
    }
    res.send(workout);
  } catch (err) {
    next(err);
  }
};

const createWorkout = async (req, res, next) => {
  try {
    const { type, duration, calories, date, notes } = req.body;
    const workout = await Workout.create({
      type,
      duration,
      calories,
      date,
      notes,
      owner: req.user._id,
    });
    res.status(201).send(workout);
  } catch (err) {
    next(err);
  }
};

const updateWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      throw new NotFoundError('No se ha encontrado el entrenamiento');
    }
    if (workout.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Este entrenamiento pertenece a otro usuario');
    }

    const { type, duration, calories, date, notes } = req.body;
    const updates = { type, duration, calories, date, notes };
    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) delete updates[key];
    });

    const updated = await Workout.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.send(updated);
  } catch (err) {
    next(err);
  }
};

const deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      throw new NotFoundError('No se ha encontrado el entrenamiento');
    }
    if (workout.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Este entrenamiento pertenece a otro usuario');
    }

    await workout.deleteOne();
    res.send({ message: 'Entrenamiento eliminado', _id: workout._id });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
