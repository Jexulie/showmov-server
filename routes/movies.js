var express = require('express');
var grabber = require('../grabber');
var Movies = require('../models/movies');
var router = express.Router();

/**
 * Fetch Movies
 */
router.get('/fetch', (req, res, next) => {
    grabber.movieGrabber(movies => {
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


/**
 * Clear Movie Collection
 */
router.delete('/clear', (req, res, next) => {
    Movies.clearMovies()
        .then(movie => {
            res.json({success: true, msg:'Collection Cleared!'});
        })
        .catch(error => {
            res.json({success: false, error:error});
        });
});


/**
 * Get Movies
 */
router.get('/get', (req, res, next) => {
    Movies.getMovies()
        .then(movies => {
            res.json({success: true, movies: movies});
        })
        .catch(error => {
            res.json({success: false, error:error});
        });
});

module.exports = router;