const express = require('express');
const router = express.Router();
const controller = require('../controller/homeController');

router.get('/', controller.show);

router.get('/faq', controller.faq);

module.exports = router;