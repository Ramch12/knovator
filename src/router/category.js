const { Router } = require('express');
const categoryRoute = Router();
const { createCategory, getCategory } = require('../controller/category')

categoryRoute.post('/create-category', createCategory);
categoryRoute.get('get-category/:_id', getCategory);
categoryRoute.get('/get-categories', getCategory);

exports.categoryRoute = categoryRoute;



