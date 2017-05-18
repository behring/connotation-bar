/**
 * Created by behring on 2017/5/18.
 */
'use strict';
let router = require('express').Router();
let Cartoon = require('.././models/cartoon');

router.get('/', function(req, res) {
    Cartoon.pagination(1,24).then(cartoons => {
        res.render('home/index', { cartoons: cartoons });
    });

});

module.exports = router;
