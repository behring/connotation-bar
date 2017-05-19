'use strict';
let router = require('express').Router();
let Cartoon = require('.././models/cartoon');
let User = require('.././models/user');

router.get('/', function(req, res) {
    Cartoon.pagination(1,24).then(cartoons => {
        res.render('home/home', { cartoons: cartoons, user: req.currentUser});
    });

});

module.exports = router;
