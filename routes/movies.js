var express = require('express');
var grabber = require('../grabber');
var Movies = require('../models/movies');
var Archive = require('../models/archive');
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

/**
 * Archive Movies
 */
router.get('/archive', (req, res, next) => {
    Movies.getMovies()
        .then(movies => {
            movies.map(movie => {
                var nArc = {
                    title: movie.title,
                    image: movie.image,
                    time: movie.time,
                    genre: movie.genre,
                    score: movie.score,
                    director: movie.director,
                    stars: movie.stars,
                    info: movie.info,
                    video: movie.video
                }
                var ArcObj = new Archive(nArc)
                Archive.checkMovie(ArcObj)
                        .then(check => {
                            if(check === false){
                                Archive.addArchives(ArcObj)
                                    .then(archive => console.info('Movie Archived!'))
                                    .catch(error => console.error(error))
                            }else{
                                console.log('Movies Already Archived!');
                            }
                        })
                        .catch(error => console.error(error))
            });
            res.json({success: true, msg:'Done!'});
        })
        .catch(error => {
            res.json({success: false, error:error});
        });
});

module.exports = router;

// fetch -> archive -> clear -> fetch again