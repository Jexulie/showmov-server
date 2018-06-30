var express = require('express');
var Apiauth = require('../models/apiauth');
var logger = require('../config/logger');
var router = express.Router();

router.get('/get', (req, res, next) => {
    Apiauth.generateKey()
        .then(key => res.json({success: true, apikey: key}))
        .catch(error => {
            logger.error(error);
            res.json({success: false, error:error})
        })
});

module.exports = router;