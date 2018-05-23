const Joi = require('joi');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const config = require('config');

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

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('password');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(genre) {
    const schema = {
      email: Joi.string().regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/).required(),
      password: Joi.string().min(3).max(50).required()
    };
    return Joi.validate(genre, schema);
  }

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
