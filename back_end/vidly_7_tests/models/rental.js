const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

const rentalSchema = new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                required: true
            },
            phone:{
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            } 
        }),
        required: true
    },
    movie:{
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            dailyRentalRate: { 
                type: Number, 
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    startDate:{
        type: Date,
        default: Date.now,
        required: true
    },
    returnDate:{
        type: Date
    },
    rentalFees:{
        type: Number,
        min: 0
    }
});

rentalSchema.statics.lookup = function(customerId, movieId) {
    return this.findOne({ 
        'customer._id': customerId,
        'movie._id': movieId
    });
}

rentalSchema.methods.addRentalFees = function () {
    this.returnDate = new Date();
    const diffDay = moment().diff(this.startDate, 'day');
    this.rentalFees = diffDay * this.movie.dailyRentalRate;
}

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