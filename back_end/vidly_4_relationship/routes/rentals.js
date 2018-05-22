const {Rental, validate} = require('../models/rental');
const {Movie, movieSchema} = require('../models/movie');
const {Customer, customerSchema} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const rental = await Rental.find().sort('title');
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
    movie: {
      _id: movie._id,
      name: movie.name
    },
    customer: {
      _id: customer._id,
      name: customer.name
    },
    startDate: Date.now()
  });

  rental = await rental.save();
  res.send(rental);
});

module.exports = router; 