const mongoose = require('mongoose');
const Joi = require ('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        minLength: 5,
        maxlength: 100,
        trim: true,
        lowercase: true,
        required: true
    },
    phone: {
        type: String,
        validate: /^[0-9]{6}$/,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validate_customer(in_data) {
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().alphanum().min(3).max(30).required(),
        phone: Joi.string().regex(/^[0-9]{6}$/).required()
    };
    return Joi.validate(in_data, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validate_customer;