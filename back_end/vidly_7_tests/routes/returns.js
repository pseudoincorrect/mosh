const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization');
const validation = require('../middleware/validation');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


router.post('/', [authorization, validation(validateRental)], 
async (req, res) => {
    let rental = await Rental.lookup( 
        req.body.customerId,
        req.body.movieId
    );

    if (!rental) 
        return res.status(404).send('no rental found');

    if (rental.returnDate) 
        return res.status(400).send('already processed');
    
    rental.addRentalFees();
    
    await rental.save();

    await Movie.update(
        { _id: rental.movie._id }, 
        { $inc: { numberInStock: 1} }
    );
    res.send(rental);
});


function validateRental(rental) {
    const schema = {
        movieId: Joi.objectId(),
        customerId: Joi.objectId(),
    };
    return Joi.validate(rental, schema);
}
  

module.exports = router;