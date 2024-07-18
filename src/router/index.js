const { Router } = require('express');
const router = Router();
const { userRoute } = require('./user');
const { categoryRoute } = require('./category');

router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/product', require('./product'));
router.use('/file', require('./file'));
module.exports = router;




