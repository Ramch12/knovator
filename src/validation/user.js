const { joiInstace } = require('./index');

const validateUserPayloadSchema = joiInstace.object({
    name: {
        firstName: joiInstace.string().min(3).max(20).required(),
        lastName: joiInstace.string().min(3).max(20).required(),
    },
    email: joiInstace.string().email().required(),
    password: joiInstace.string().min(5).max(255).required(),
    phone: joiInstace.string().min(10).max(15).required(),
    address: {
        street: joiInstace.string().min(5).max(100).required(),
        country: joiInstace.string().min(5).max(100).required(),
        postalCode: joiInstace.number().required(),
        city: joiInstace.string().min(5).max(100).required(),
        state: joiInstace.string().min(5).max(100).required(),
    },
});

const userLoginPayloadSchema = joiInstace.object({
    email: joiInstace.string().email().required(),
    password: joiInstace.string().min(5).max(255).required(),
});

const userUpdatePayloadSchema = joiInstace.object(
    {
        name: {
            firstName: joiInstace.string().min(3).max(20).optional(),
            lastName: joiInstace.string().min(3).max(20).required().optional(),
        },
        email: joiInstace.string().email().optional(),
        password: joiInstace.string().min(5).max(255).optional(),
        phone: joiInstace.string().min(10).max(15).optional(),
        address: {
            street: joiInstace.string().min(5).max(100).optional(),
            country: joiInstace.string().min(5).max(100).optional(),
            postalCode: joiInstace.number().optional(),
            city: joiInstace.string().min(5).max(100).optional(),
            state: joiInstace.string().min(5).max(100).optional(),
        },
    }
);

module.exports = { validateUserPayloadSchema, userLoginPayloadSchema, userUpdatePayloadSchema };