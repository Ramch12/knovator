const { Schema, model } = require('mongoose');
const categorySchema = new Schema({
    name: {
        type: String,
        enum: ['electronics', 'fashion', 'food'],
        default: "fashion",
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});
exports.Category = model('Category', categorySchema);

