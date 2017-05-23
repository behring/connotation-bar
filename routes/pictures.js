'use strict';
let router = require('express').Router();
let Picture = require('../models/picture');

// 查询 Picture 列表
router.get('/', function(req, res) {
    let params = req.query;

    res.format({
        'application/json': function(){
            Picture.pagination(params.page, params.count).then((results)=>{
                res.json(results);
            },(error)=>{
                res.send(error);
            });
        }
    });
});

router.get('/:category/:number', function(req, res, next) {
    let category = req.params.category;
    let number = parseInt(req.params.number);
    let homeCategorys = ['色系军团','搞笑动图', '内涵图'];
    let isLimited = true;
    res.format({
        'text/html': function() {
            if(homeCategorys.indexOf(category)!==-1 && number<defaultShowPictureCount) {
                isLimited = false;
            }

            Picture.queryOneBy({category, number}).then(picture => {
                res.render('pictures/show', {
                    picture: picture,
                    user: req.currentUser,
                    isLimited: isLimited
                });
            }).catch(error => {
                console.error(error);
                next(error);
            });
        }
    });
});

router.get('/:category', function(req, res, next) {
    let category = req.params.category;
    let page = req.query.page;
    res.format({
        'text/html': function(){
            var perPage = 18;
            Picture.count({category}).then(count => {
                Picture.pagination(page, perPage ,{category}).then(pictures => {
                    res.render('pictures/index', {
                        pictures: pictures,
                        user: req.currentUser,
                        currentPage: page,
                        totalPages: Math.ceil(count/18)
                    });
                }).catch(error => {
                    console.error(error);
                    next(error);
                });
            });
        }
    });
});

module.exports = router;
