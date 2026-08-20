const User = require('../models/user');
const Workout = require('../models/workout');
const { selectTips } = require('../utils/tips');
const { summarize, filterByWeek } = require('../utils/stats');
const { NotFoundError } = require('../utils/errors');

// Devuelve los consejos mas relevantes segun el perfil y la actividad del usuario
const getTips = async (req, res, next) => {
  try {
    const [user, workouts] = await Promise.all([
      User.findById(req.user._id),
      Workout.find({ owner: req.user._id }),
    ]);

    if (!user) {
      throw new NotFoundError('No se ha encontrado el usuario');
    }

    const context = {
      user,
      bmi: user.bmi,
      totals: summarize(workouts),
      weekly: summarize(filterByWeek(workouts)),
      typesUsed: [...new Set(workouts.map((workout) => workout.type))],
    };

    res.send(selectTips(context));
  } catch (err) {
    next(err);
  }
};

module.exports = { getTips };
