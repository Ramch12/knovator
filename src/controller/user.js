const { functionVersion, asyncWrapper } = require('../middleware/asyncWrapper');
const { validateUserPayloadSchema, userLoginPayloadSchema, userUpdatePayloadSchema } = require('../validation/user');
const { CustomErrorResponse } = require('../utils/customError');
const User = require('../models/users');


/**
 * POST /create-user
 * @summary Creates a new user
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @param {express.NextFunction} next - The next middleware function
 * @returns {Promise<void>} - Returns a newly created user
 * @throws {ValidationError} - If the user data is invalid
 */

exports.createUser = asyncWrapper(async (req, res) => {
    const { error, value } = validateUserPayloadSchema.validate(req.body);
    if (error) {
        throw new CustomErrorResponse(400, error.details.map(item => item.message), {})
    }
    const existUser = await User.findOne({ email: { $eq: value.email } });
    if (existUser) {
        throw new CustomErrorResponse(400, 'User with this email already exist', {})
    }
    const user = await User.create(value);
    const token = user.createToken(user);
    res.status(201).json({
        status: true,
        message: "User created successfully",
        data: user,
        token
    });
});

/**
 * POST /login-user
 * @summary Creates a new user
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @param {express.NextFunction} next - The next middleware function
 * @returns {Promise<void>} - Returns a newly created user
 * @throws {ValidationError} - If the user data is invalid
 */

exports.signInUser = asyncWrapper(async (req, res) => {
    const { error, value } = userLoginPayloadSchema.validate(req.body);
    if (error) {
        throw new CustomErrorResponse(400, error.details.map(item => item.message), {})
    }
    const user = await User.findOne({ email: value.email });
    if (!user) {
        throw new CustomErrorResponse(404, 'invalid email or password', {})
    };
    const validatePassword = await user.comparePassword(value.password)
    if (!validatePassword) {
        throw new CustomErrorResponse(404, "invalid email or passwors!", {})
    }
    const token = user.createToken();
    res.status(200).json({
        status: true,
        message: "logged in suucessfully!",
        token,
        data: user
    })
});

/**
 * GET /get-user/:_id
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @param {express.NextFunction} next - The next middleware function
 * @returns {Promise<void>} - Returns a user by ID
 */

exports.getUser = asyncWrapper(async (req, res) => {
    const { _id } = req.params
    const user = await User.findById(_id);
    if (!user) {
        throw new CustomErrorResponse(404, "user does'nt exist", {})
    };
    res.status(200).json({ status: true, user })
});

/**
 * GET /get-users
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @param {express.NextFunction} next - The next middleware function
 * @returns {Promise<void>} - Returns a user by ID
 */

exports.getUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({

    }).select('-password')
    if (!users.length) {
        throw new CustomErrorResponse(404, "no users found", {})
    }
    return res.status(200).json({
        status: true,
        users
    })
});

/**
 * put /update-user/:_id
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @param {express.NextFunction} next - The next middleware function
 * @returns {Promise<void>} - Returns a user by ID
 */

exports.updateUser = asyncWrapper(async (req, res) => {
    const { error, value } = userUpdatePayloadSchema.validate(req.body);
    if (error) {
        throw new CustomErrorResponse(400, error.details.map(item => item.message), {})
    }
    const { _id } = req.params;
    const updatedUser = await User.findOneAndUpdate({ _id }, value, { new: true }).select('-password');
    if (!updatedUser) {
        throw new CustomErrorResponse(500, 'failed to udpate', {})
    };
    res.status(201).json({
        status: true,
        user: updatedUser
    });
});

exports.deleteUser = asyncWrapper(async (req, res) => {
    const { _id } = req.params;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
        throw new CustomErrorResponse(404, 'user not found', {})
    }
    res.status(200).json({ status: true, message: "User successfully deleted!" })
})


