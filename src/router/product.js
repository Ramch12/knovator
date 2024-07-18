const router = require('express').Router()
const { createProduct, getProduct } = require('../controller/product')

router.post('/create-product', createProduct);
router.get('/get-product', getProduct);

module.exports = router;