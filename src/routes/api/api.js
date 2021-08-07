let express = require('express');
let router = express.Router();

const productController = require('../../controller/api/apiProductController');
const userController = require('../../controller/api/apiUserController')

router.get('/products', productController.list);
router.get('/products/:id', productController.detail);
router.get('/products/latest', productController.latest);
router.get('/users', userController.list);
router.get('/users/:id', userController.detail);

module.exports = router;