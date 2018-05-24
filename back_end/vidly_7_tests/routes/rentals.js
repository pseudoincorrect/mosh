const Fawn = require('fawn');
const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rental = await Rental.find().sort('-startDate');
  res.send(rental);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send('Rental ID not found');
    res.send(rental);
});
  
router.post('/', async (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('invalid movie');

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('invalid customer');
  
  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    },
    startDate: Date.now()
  });

  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies',{_id: movie._id}, {
        $inc:{numberInStock:-1}
      })
      .run();

    res.send(rental);
  } catch (error) { 
    res.status(500).send('Something failed.');
  }
});

module.exports = router; 