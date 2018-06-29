var express = require('express');
var Apiauth = require('../models/apiauth');
var router = express.Router();

router.get('/get', (req, res, next) => {
    Apiauth.generateKey()
        .then(key => res.json({success: true, apikey: key}))
        .catch(error => res.json({success: false, error:error}))
});

module.exports = router;