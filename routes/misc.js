var express = require('express');
var router = express.Router();

router.get('/unauthorized', (req, res, next) => {
    res.status(403);
    res.json({success: false, msg:'You Are Not Authorized!'});
});

router.get('/404', (req, res, next) => {
    res.status(404);
    res.json({success: false, msg:'Wrong Endpoint.'});
});

router.get('/500', (req, res, next) => {
    res.status(500);
    res.json({success: false, msg:'Something went wrong on our side. We will take care of it soon...'});
});

module.exports = router;