'use strict';
let router = require('express').Router();
let Cartoon = require('.././models/cartoon');

router.get('/', function(req, res) {
    Cartoon.pagination(1,24).then(cartoons => {
        res.render('home/home', { cartoons: cartoons });
    });

});

module.exports = router;
