var express = require('express');
var grabber = require('../grabber');
var Comingsoons = require('../models/comingsoon');
var router = express.Router();

/**
 * Fetch ComingSoons
 */
router.get('/fetch', (req, res, next) => {
    grabber.comingsoonGrabber(comingsoons => {
        comingsoons.map(comingsoon => {
            var comingsoonObj = new Comingsoons(comingsoon)
            Comingsoons.fetchComingsoons(comingsoonObj)
            .then(comingsoon => {
                console.info('Comingsoon Added!');
            })
            .catch(error => {
                console.error(error);
            });
        });
        res.json({success: true, msg:'Done!'});
    });
});


/**
 * Clear ComingSoon Collection
 */
router.delete('/clear', (req, res, next) => {
    Comingsoons.clearComingsoons()
        .then(comingsoon => {
            res.json({success: true, msg:'Collection Cleared!'});
        })
        .catch(error => {
            res.json({success: false, error:error});
        });
});


/**
 * Get ComingSoons
 */
router.get('/get', (req, res, next) => {
    Comingsoons.getComingsoons()
        .then(comingsoons => {
            res.json({success: true, comingsoons: comingsoons});
        })
        .catch(error => {
            res.json({success: false, error:error});
        });
});
module.exports = router;