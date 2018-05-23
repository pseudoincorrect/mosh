const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function (){
    console.log('here');
    
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('Connected to MongoDB...'));
};
