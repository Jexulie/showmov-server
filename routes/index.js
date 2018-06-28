var express = require('express');
var grabber = require('../grabber');
var Movies = require('../models/movies');
var router = express.Router();

router.get('/fetchmovies', (req, res, next) => {
    grabber(movies => {
        movies.map(movie => {
            var movieObj = new Movies(movie)
            Movies.fetchMovies(movieObj)
            .then(movie => {
                console.info('Movie Added!');
            })
            .catch(error => {
                console.error(error);
            });
        });
        res.json({success: true, msg:'Done!'});
    });
});

router.delete('/clearall', (req, res, next) => {
    Movies.clearAll()
        .then(movie => {
            res.json({success: true, msg:'Collection Cleared!'});
        })
        .catch(error => {
            res.json({success: false, error:error});
        });
});

router.get('/getmovies', (req, res, next) => {
    Movies.getMovies()
        .then(movies => {
            res.json({success: true, movies: movies});
        })
        .catch(error => {
            res.json({success: false, error:error});
        });
});

module.exports = router;