const router = require('express').Router();

const controller = require('../controllers/ShortenerController');

router.get('/', controller.index);
router.post('/', controller.newUrl);
router.get('/:id([A-Za-z0-9_]{5})', controller.redirectTiny);
router.get('/:id([A-Za-z0-9_]{5}\\+)', controller.statsTiny);

module.exports = router;