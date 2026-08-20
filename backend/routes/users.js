const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateProfileUpdate } = require('../middlewares/validation');
const { getCurrentUser, updateProfile } = require('../controllers/users');

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, validateProfileUpdate, updateProfile);

module.exports = router;
