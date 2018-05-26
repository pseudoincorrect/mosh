const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 50,
        unique: true,
        required: true
    },
    password: { 
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'incorrect email address format');

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(genre) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi
        .string()
        .regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        .required(),
    password: Joi.string().min(3).max(50).required(),
    isAdmin: Joi.boolean()
  };
  return Joi.validate(genre, schema);
}

exports.User = User; 
exports.validate = validateUser;
exports.userSchema = userSchema;