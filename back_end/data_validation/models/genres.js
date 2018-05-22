const Joi = require ('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxlength: 100,
        trim: true,
        lowercase: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validate_genre(in_data) {
    const schema = {
        name: Joi.string().alphanum().min(3).max(30).required()
    };
    return Joi.validate(in_data, schema);
}

exports.Genre = Genre;
exports.validate = validate_genre;