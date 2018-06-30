var express = require('express');
var grabber = require('../grabber');
var Comingsoons = require('../models/comingsoons');
var Apiauth = require('../models/apiauth');
var logger = require('../config/logger');
var router = express.Router();

/**
 * Fetch ComingSoons
 */
router.get('/fetch', (req, res, next) => {
    var apikey = req.query.apikey;
    Apiauth.autherize(apikey)
        .then(user => {
            if(user){
                grabber.comingsoonGrabber(comingsoons => {
                    comingsoons.map(comingsoon => {
                        var comingsoonObj = new Comingsoons(comingsoon)
                        Comingsoons.fetchComingsoons(comingsoonObj)
                        .then(comingsoon => {
                            logger.info(`${comingsoon.title} Added to Database.`);
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
 * Clear ComingSoon Collection
 */
router.delete('/clear', (req, res, next) => {
    var apikey = req.query.apikey;
    Apiauth.autherize(apikey)
        .then(user => {
            if(user){
                Comingsoons.clearComingsoons()
                    .then(comingsoon => {
                        res.json({success: true, msg:'Collection Cleared!'});
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


/**
 * Get ComingSoons
 */
router.get('/get', (req, res, next) => {
    var apikey = req.query.apikey;
    Apiauth.autherize(apikey)
        .then(user => {
            if(user){
                Comingsoons.getComingsoons()
                    .then(comingsoons => {
                        res.json({success: true, comingsoons: comingsoons});
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