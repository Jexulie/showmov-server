var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var winston = require('winston');

var config = require('./config/config');

var moviesRoute = require('./routes/movies');
var comingsoonsRoute = require('./routes/comingsoons');
var archivesRoute = require('./routes/archives');
var miscRoute = require('./routes/misc');
var apiauthRoute = require('./routes/apiauth');

var app = express();

mongoose.connect(config.db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/v1/movies', moviesRoute);
app.use('/api/v1/comingsoons', comingsoonsRoute);
app.use('/api/v1/archives', archivesRoute);
app.use('/api/v1/auth', apiauthRoute);
app.use('/api/v1', miscRoute);

/* Logger */
var logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            filename: './log/console.log',
            level: 'info'
        }),
        new winston.transports.File({
            filename: './log/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: './log/combined.log',
            level: 'info'
        })
    ]
});
winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
);

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

app.all('*', (req, res) => res.redirect('/api/v1/404'));

app.listen(process.env.PORT ||config.port);