const { asyncWrapper } = require('../middleware/asyncWrapper');
const { Category } = require('../models/category');
exports.createCategory = asyncWrapper(async (req, res) => {
    const category = await Category.create(req.body);
    res.send(category);

});
exports.getCategory = asyncWrapper(async (req, res) => {

});

exports.getCategories = asyncWrapper(async (req, res) => {

})