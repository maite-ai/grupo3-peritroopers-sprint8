const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const uploadFile = require('../middlewares/multerMiddlewareProduct');
const validations = require('../middlewares/productValidationsMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

router.get("/productCart", authMiddleware, productController.productCart);
router.get('/', productController.list);
router.get('/search', productController.search);
router.get('/create', authMiddleware, userAuthMiddleware, productController.create);
router.post('/create', uploadFile.single('image'), validations, productController.store);
router.get('/:id', productController.detail);
router.get('/:id/edit', authMiddleware, userAuthMiddleware, productController.edit);
router.put('/:id', uploadFile.single('image'), validations, productController.update);
router.get('/delete/:id', authMiddleware, userAuthMiddleware, productController.delete);
router.delete('/delete/:id', authMiddleware, userAuthMiddleware, productController.destroy);

module.exports = router;