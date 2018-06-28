var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var winston = require('winston');

var config = require('./config/config');
var moviesRoute = require('./routes/movies');
var comingsoonsRoute = require('./routes/comingsoons');

var app = express();

mongoose.connect(config.db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/v1/movies', moviesRoute);
app.use('/api/v1/comingsoons', comingsoonsRoute);

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

app.listen(config.port);