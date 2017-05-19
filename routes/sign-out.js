/**
 * Created by behring on 2017/5/18.
 */
'use strict';
let router = require('express').Router();
let User = require('.././models/user');

router.get('/', function (req, res) {
    req.currentUser.logOut;
    res.clearCurrentUser();
    res.redirect('/');
});

module.exports = router;
