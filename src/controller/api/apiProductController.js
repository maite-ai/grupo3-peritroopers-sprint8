const list = require('./apiProductController/list');
const detail = require('./apiProductController/detail');
const latest = require('./apiProductController/latest');
const { header } = require('express-validator');

const controller = {
    list,
    detail,
    latest,
};

module.exports = controller;