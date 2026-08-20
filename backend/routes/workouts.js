const router = require('express').Router();
const {
  validateId,
  validateWorkout,
  validateWorkoutUpdate,
} = require('../middlewares/validation');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workouts');

router.get('/', getWorkouts);
router.post('/', validateWorkout, createWorkout);
router.get('/:id', validateId, getWorkout);
router.patch('/:id', validateId, validateWorkoutUpdate, updateWorkout);
router.delete('/:id', validateId, deleteWorkout);

module.exports = router;
