const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('./startup/routes')(app);
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
winston = require('winston');
require('winston-mongodb');

// powershell: $env:vidly_jwtPrivateKey = "mySecureKey"
// powershell: Write-Output $env:vidly_jwtPrivateKey
if (!config.get('jwtPrivateKey')){
  console.log('FATAL ERROR: jwtPrivateKey not defined');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  winston.handleExceptions(
    new winston.transports.Console({colorize: true, prettyPrint: true}),
    new winston.transports.File({filename: "exception.log"})
  );
  
  process.on('unhandledRejection', (ex) => {
    // since winston does not catch unhandled Rejections,
    // we catch them with the OS event (process.on())
    // and throw it as an exception that will be caught
    // by winston
    throw ex;
  });
  
  winston.add(winston.transports.File,{filename:'logfile.log'});
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly',
    level: "info"
  });
  

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));