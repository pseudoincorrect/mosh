const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization');
const admin = require('../middleware/admin');
const validateId = require('../middleware/validateObjectId');

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', validateId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send(
              'The genre with the given ID was not found.');

  res.send(genre);
});

router.post('/', authorization, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id, 
    { name: req.body.name }, 
    { new: true }
  );

  if (!genre) return res.status(404).send(
          'The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id', authorization, admin, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send(
          'The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;


/*
example of POST at http://localhost:3000/api/genres
{
	"name": "horror"
}
*/