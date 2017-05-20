'use strict';
let router = require('express').Router();
let Picture = require('../models/picture');
let User = require('.././models/user');

router.get('/', function(req, res) {
    Picture.pagination(1,24).then(pictures => {
        res.render('home/home', { pictures: pictures, user: req.currentUser});
    });

});

module.exports = router;
