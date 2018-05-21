const express = require('express');
const router = express.Router();
const Joi = require ('joi');

let genres = [
    {id: 0 , name: 'horror'},
    {id: 1 , name: 'sci-fi'},
    {id: 2 , name: 'kids'},
    {id: 3 , name: 'drama'}
]

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(function(c) { return c.id === parseInt(req.params.id)});
    if (!genre) return res.status(404).send(`the genre with the id ${req.params.id} was not found`);

    res.send(genre);
});

router.post('/', (req, res) => {
    const result = validate_genre(req.body);
    if(result.error) return res.send(400, result.error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(function(c) { return c.id === parseInt(req.params.id)});
    if (!genre) return res.status(404).send(`the genre with the id ${req.params.id} was not found`);
    
    const result = validate_genre(req.body);
    if(result.error) return res.send(400, result.error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre_id = req.params.id;
    const genre = genres.find(function(c) { return c.id === parseInt(genre_id)});
    if (!genre) return res.status(404).send(`the genre with the id ${genre_id} was not found`);

    genre_index = genres.indexOf(genre);
    genres.splice(genre_index, 1);
    res.send(genre);
});

function validate_genre(in_data) {
    const schema = {
        name: Joi.string().alphanum().min(3).max(30).required()
    };
    return Joi.validate(in_data, schema);
}

module.exports = router;