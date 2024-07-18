const mongoose = require('mongoose')
exports.errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    const data = err.data || {};
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            status: false,
            message: "Invalid ID formate",
            data: {}
        })
    }
    if (err.code === 11000 && err.codeName === 'DuplicateKey') {
        res.status(404).json({
            status: false,
            message: "user with this email is already exists!",
            data
        });
    }
    console.log('error', err);
    res.status(statusCode).json({ status: false, message, data });
}