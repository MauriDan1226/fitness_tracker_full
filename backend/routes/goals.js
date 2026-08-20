const router = require('express').Router();
const { validateId, validateGoal, validateGoalUpdate } = require('../middlewares/validation');
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goals');

router.get('/', getGoals);
router.post('/', validateGoal, createGoal);
router.patch('/:id', validateId, validateGoalUpdate, updateGoal);
router.delete('/:id', validateId, deleteGoal);

module.exports = router;
