const express = require('express');
const app = express();
const genres = require('./router/genres');
const home = require('./router/home');

// http://localhost:3000/api/genres/id

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(3000, () => {console.log('listening on port 3000')});


