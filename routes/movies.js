var express = require('express');
var grabber = require('../grabber');
var Movies = require('../models/movies');
var Archive = require('../models/archive');
var Apiauth = require('../models/apiauth');
var logger = require('../config/logger');
var router = express.Router();

/**
 * Fetch Movies
 */
router.get('/fetch', (req, res, next) => {
    var apikey = req.query.apikey;
    Apiauth.autherize(apikey)
        .then(user => {
            if(user){
                grabber.movieGrabber(movies => {
                    movies.map(movie => {
                        var movieObj = new Movies(movie)
                        Movies.fetchMovies(movieObj)
                        .then(movie => {
                            logger.info(`${movie.title} Added to Database!`);
                        })
                        .catch(error => {
                            logger.error(`Error message: ${error}`);
                        });
                    });
                    res.json({success: true, msg:'Done!'});
                });
            }else{
                res.redirect('/api/v1/403');
            }
        })
        .catch(error => {
            logger.error(error);
            res.json({success: false, error:error})
        })
});


/**
 * Clear Movie Collection
 */
router.delete('/clear', (req, res, next) => {
    logger.info('hello')
    var apikey = req.query.apikey;
    Apiauth.autherize(apikey)
        .then(user => {
            if(user){
                Movies.clearMovies()
                .then(movie => {
                    res.json({success: true, msg:'Collection Cleared!'});
                })
                .catch(error => {
                    logger.error(error);
                    res.json({success: false, error:error});
                });
            }else{
                res.redirect('/api/v1/403');
            }
        })
        .catch(error => {
            logger.error(error);
            res.json({success: false, error:error})
        })
});


/**
 * Get Movies
 */
router.get('/get', (req, res, next) => {
    var apikey = req.query.apikey;
    Apiauth.autherize(apikey)
        .then(user => {
            if(user){
                Movies.getMovies()
                    .then(movies => {
                        refreshMovies();
                        res.json({success: true, movies: movies});
                    })
                    .catch(error => {
                        res.json({success: false, error:error});
                    });
            }else{
                res.redirect('/api/v1/403');
            }
        })
        .catch(error => {
            logger.error(error);
            res.json({success: false, error:error})
        })
});


module.exports = router;

/**
 * Movie Clear -> Fetch
 * Automation
 */
function refreshMovies(){
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
                                .then(archive => logger.info(`${archive.title} Archived!`))
                                .catch(error => logger.error(error))
                        }else{
                            logger.info(`${ArcObj.title} Already Archived!` );
                        }
                    })
                    .catch(error => logger.error(error))
            });
        })
        .catch(error => {
            logger.error(error);
        });
    Movies.clearMovies()
        .then(movie => {
            logger.info(`Movie Deleted from Database!`);
        })
        .catch(error => {
            logger.error(error);
        });
    grabber.movieGrabber(movies => {
        movies.map(movie => {
            var movieObj = new Movies(movie)
            Movies.fetchMovies(movieObj)
            .then(movie => {
                logger.info(`${movie.title} Added to Database!`);
            })
            .catch(error => {
                logger.error(`Error message: ${error}`);
            });
        });
    });
}
