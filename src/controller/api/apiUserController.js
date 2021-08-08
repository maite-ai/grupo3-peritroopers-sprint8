const list = require('./apiUserController/list');
const detail = require('./apiUserController/detail');
const latest = require('./apiUserController/latest');

const controller = {
    list,
    detail,
    latest,
};

module.exports = controller;