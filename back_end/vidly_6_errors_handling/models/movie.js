const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = require('./genre');

const movieSchema = new mongoose.Schema({
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
    numberInStock: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(genre) {
  const schema = {
    title: Joi.string().min(3).required(),
    genreId: Joi.string().min(3).required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()

  };

  return Joi.validate(genre, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;
exports.movieSchema = movieSchema;