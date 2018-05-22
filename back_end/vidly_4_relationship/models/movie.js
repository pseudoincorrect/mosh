const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: Number,
    dailyRentalRate: Number
}));

function validateMovie(genre) {
  const schema = {
    title: Joi.string().min(3).required(),
    genre_id: Joi.string().min(3).required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()

  };

  return Joi.validate(genre, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;