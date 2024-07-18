const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');

const userSchema = new Schema({
    name: {
        firstName: {
            type: String,
            min: 5,
            max: 20,
            required: true
        },
        lastName: {
            type: String,
            min: 5,
            max: 20,
            required: true
        }
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
        validate: [(email) => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return reg.test(email)
        }, 'please fill valid email address'],
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        min: 10,
        max: 12
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    console.log("password", this.password)
    this.password = await bcrypt.hash(this.password, salt);
    next()
});

userSchema.methods.comparePassword = async function (simplePassword) {
    const result = await bcrypt.compare(simplePassword, this.password);
    return result;
};

userSchema.methods.createToken = function () {
    const payload = _.omit(this.toJSON(), ['password']);
    return sign(payload, config.get('app.privateKey'), {
        expiresIn: '1h',
    })
}

module.exports = model('user', userSchema);