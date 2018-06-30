var express = require('express');
var Movies = require('../models/movies');
var Archive = require('../models/archive');
var Apiauth = require('../models/apiauth');
var logger = require('../config/logger');
var router = express.Router();



/**
 * Archive Movies
 */
router.get('/save', (req, res, next) => {
    var apikey = req.query.apikey;
    Apiauth.autherize(apikey)
        .then(user => {
            if(user){
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
                        res.json({success: true, msg:'Done!'});
                    })
                    .catch(error => {
                        res.json({success: false, error:error});
                    });
            }else{
                res.redirect('/api/v1/403');
            }
        })
        .catch(error => res.json({success: false, error:error}))
});

/**
 * Get Archives
 */
router.get('/get', (req, res, next) => {
    var apikey = req.query.apikey;
    Apiauth.autherize(apikey)
        .then(user => {
            if(user){
                Archive.getArchives()
                    .then(archive => {
                        res.json({success: true, archive:archive});
                    })
                    .catch(error => {
                        res.json({success: false, error:error});
                    })
            }else{
                res.redirect('/api/v1/403');
            }
        })
        .catch(error => res.json({success: false, error:error}))
});

module.exports = router;

// fetch -> archive -> clear -> fetch again