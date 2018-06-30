var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var config = require('./config/config');
var logger = require('./config/logger');

var moviesRoute = require('./routes/movies');
var comingsoonsRoute = require('./routes/comingsoons');
var archivesRoute = require('./routes/archives');
var miscRoute = require('./routes/misc');
var apiauthRoute = require('./routes/apiauth');

var app = express();

mongoose.connect(config.db);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/v1/movies', moviesRoute);
app.use('/api/v1/comingsoons', comingsoonsRoute);
app.use('/api/v1/archives', archivesRoute);
app.use('/api/v1/auth', apiauthRoute);
app.use('/api/v1', miscRoute);

app.all('*', (req, res) => res.redirect('/api/v1/404'));

app.listen(process.env.PORT || config.port);