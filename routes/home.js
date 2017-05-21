'use strict';
let router = require('express').Router();
let Picture = require('../models/picture');
let User = require('.././models/user');

router.get('/', function(req, res) {
    var responseData = {};
    Picture.pagination(1,18,{category:'色系军团'}).then(sexis => {
        responseData.sexis = sexis;
        Picture.pagination(1,18,{category:'搞笑动图'}).then(funnyGifs => {
            responseData.funnyGifs = funnyGifs;
            res.render('home/home', Object.assign({},responseData,{kind:'首页'},{user: req.currentUser}));
        });
    });

});

module.exports = router;
