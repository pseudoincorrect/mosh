const express = require('express');
const app = express();
const genres = require('./router/genres');
const home = require('./router/home');
const mongoose = require('mongoose');

// http://localhost:3000/api/genres/id

mongoose.connect('mongodb://localhost/vidly')
    .then( () => console.log("connected to db"))
    .catch(err => console.log('Error at db connection', err.message));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(3000, () => {console.log('listening on port 3000')});
