const express = require('express');
const Joi = require ('joi');
const mongoose = require('mongoose');
const {Genre, validate} = require('../models/genres');

const router = express.Router();

router.get('/', getGenres);
router.get('/:id', getGenreById);
router.post('/', saveGenre);
router.put('/:id', updateGenre); 
router.delete('/:id', deleteGenre);

async function getGenres(req, res){
    const genres = await Genre
        .find()
        .sort({name: "ascending"})
    res.send(genres);
}

async function getGenreById(req, res) {
    const genre = await Genre
    .findById(req.params.id)
    if (!genre) return res.status(404).send(`the genre with the id ${req.params.id} was not found`);
    res.send(genre);
}

async function saveGenre (req, res) {
    const {error} = validate(req.body);
    if(error) return res.send(400, error.details[0].message);
    let genre = new Genre ({name : req.body.name});
    genre = await genre.save();
    res.send(genre);
}

async function updateGenre (req, res) {
    const {error} = validate(req.body);
    if(error) return res.send(400, error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(
        req.params.id, 
        {name: req.body.name},
        {new: true}
    );
    if (!genre) return res.status(404).send(`the genre with the id ${req.params.id} was not found`);
    res.send(genre);
}

async function deleteGenre (req, res) {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send(`the genre with the id ${req.params.id} was not found`);
    res.send(genre);
}

module.exports = router;