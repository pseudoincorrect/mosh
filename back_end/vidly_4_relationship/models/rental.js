const Joi = require('joi');
const mongoose = require('mongoose');
const customerSchema = require('./customer');
const movieSchema = require('./movie');

const rentalSchema = new mongoose.Schema({
    customer:{
        type: customerSchema,
        required: true
    },
    movie:{
        type: movieSchema,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    returnDate:{
        type: Date
    }
});

const Rental = mongoose.model('Rental', rentalSchema);


function validateRental(genre) {
    const schema = {
        movieId: Joi.string().min(3).required(),
        customerId: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

exports.Rental = Rental; 
exports.validate = validateRental;