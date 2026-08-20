const router = require('express').Router();
const { getTips } = require('../controllers/tips');

router.get('/', getTips);

module.exports = router;
