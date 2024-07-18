const joi = require('joi');

exports.joiInstace = joi.defaults((schema) => {
    return schema.options({
        abortEarly: false,
        errors: {
            wrap: {
                label: " "
            }
        }
    })
})