const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//set up express app
const app = express();

//log request to console
app.use(logger('dev'));

//parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./server/routes')(app);
app.get('*', (request, response) => response.status(200).send({
    message: 'This is the twooter API.',
}))

module.exports = app;
