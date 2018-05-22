const {User, validate} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().sort('title');
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.post('/', async (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('invalid genre');
  
  let movie = new Movie({ 
    title : req.body.title,
    genre : {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  movie = await movie.save();
  res.send(movie);
});

module.exports = router; 

/*
POST, GET at http://localhost:3000/api/users
PUT, GET, DELETE at http://localhost:3000/api/users/:id

{
  "name": "Thomas Fernadez",
  "email": "email@domain.com",
  "password": "ThisAClearPassword"
}
*/
