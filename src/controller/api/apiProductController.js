const list = require('./apiProductController/list');
const detail = require('./apiProductController/detail');
const { header } = require('express-validator');

const controller = {
    list,
    detail,
};

module.exports = controller;