const Goal = require('../models/goal');
const Workout = require('../models/workout');
const User = require('../models/user');
const { NotFoundError, ForbiddenError } = require('../utils/errors');
const { calculateProgress } = require('../utils/progress');

// Une cada meta con su avance actual para que el cliente no tenga que calcularlo
const withProgress = (goal, context) => ({
  ...goal.toObject(),
  progress: calculateProgress(goal, context),
});

const buildContext = async (userId) => {
  const [workouts, user] = await Promise.all([
    Workout.find({ owner: userId }),
    User.findById(userId),
  ]);
  return { workouts, currentWeight: user ? user.weight : null };
};

const getGoals = async (req, res, next) => {
  try {
    const [goals, context] = await Promise.all([
      Goal.find({ owner: req.user._id }).sort({ createdAt: -1 }),
      buildContext(req.user._id),
    ]);
    res.send(goals.map((goal) => withProgress(goal, context)));
  } catch (err) {
    next(err);
  }
};

const createGoal = async (req, res, next) => {
  try {
    const { title, type, target, startValue, deadline } = req.body;

    let start = startValue;
    // en las metas de peso el punto de partida por defecto es el peso actual del perfil
    if (type === 'weight' && start === undefined) {
      const user = await User.findById(req.user._id);
      start = user ? user.weight : null;
    }

    const goal = await Goal.create({
      title,
      type,
      target,
      startValue: start ?? null,
      deadline: deadline ?? null,
      owner: req.user._id,
    });

    const context = await buildContext(req.user._id);
    res.status(201).send(withProgress(goal, context));
  } catch (err) {
    next(err);
  }
};

const updateGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      throw new NotFoundError('No se ha encontrado la meta');
    }
    if (goal.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Esta meta pertenece a otro usuario');
    }

    const { title, type, target, startValue, deadline, completed } = req.body;
    const updates = { title, type, target, startValue, deadline, completed };
    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) delete updates[key];
    });

    const updated = await Goal.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    const context = await buildContext(req.user._id);
    res.send(withProgress(updated, context));
  } catch (err) {
    next(err);
  }
};

const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      throw new NotFoundError('No se ha encontrado la meta');
    }
    if (goal.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Esta meta pertenece a otro usuario');
    }

    await goal.deleteOne();
    res.send({ message: 'Meta eliminada', _id: goal._id });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
