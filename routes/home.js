'use strict';
let router = require('express').Router();
let Picture = require('../models/picture');
let User = require('.././models/user');

router.get('/', function(req, res) {
    var count = defaultShowPictureCount;
    if(req.currentUser) {
        count = 18;
    }

    var responseData = {};
    Picture.pagination(1,count,{category:'色系军团'},'number').then(sexis => {
        responseData.sexis = sexis;
        Picture.pagination(1,count,{category:'搞笑动图'},'number').then(funnyGifs => {
            responseData.funnyGifs = funnyGifs;

            Picture.pagination(1,count,{category:'内涵图'},'number').then(neihans => {
                responseData.neihans = neihans;
                res.render('home/home', Object.assign({},responseData,{kind:'首页'},{user: req.currentUser}));
            });

        });
    });

});

module.exports = router;
