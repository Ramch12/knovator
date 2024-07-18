const { CustomErrorResponse } = require('../utils/customError');
const { asyncWrapper } = require('../middleware/asyncWrapper');
const { verify } = require('jsonwebtoken');
const config = require('config')

exports.authToken = asyncWrapper(async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        throw new CustomErrorResponse(401, "No token provided")
    }
    const actual_token = (token || "").split(" ")[1];
    if (!actual_token) {
        throw new CustomErrorResponse(401, "invalid token provided", {})
    };
    req.user = verify(actual_token, config.get('app.privateKey'));
    next();
});