/**
 * Created by behring on 2017/5/18.
 */
'use strict';
let router = require('express').Router();

router.get('/', function(req, res) {
    res.render('sign-in/sign-in');
});

module.exports = router;
