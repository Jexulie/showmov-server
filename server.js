var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var winston = require('winston');

var config = require('./config/config');
var indexRoute = require('./routes');

var app = express();

mongoose.connect(config.db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/v1', indexRoute);

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