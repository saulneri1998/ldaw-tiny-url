const router = require('express').Router();

const controller = require('../controllers/ShortenerController');

router.get('/', controller.index);

module.exports = router;