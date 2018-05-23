const {User, validate} = require('../models/user');
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

  let user = await User.findOne({email: req.body.email})
  if (user) return res.status(400).send('user already registered');

  user = new User({ 
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  await user.save();
  res.send(user);
});

module.exports = router; 

/*
example of POST at http://localhost:3000/api/users
{
  "name": "Tommy",
  "email": "name@domain.com",
  "password": "idontlikepasswords"
}
*/
