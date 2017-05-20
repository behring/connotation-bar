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

    console.log(category);
    console.log(number);

    res.format({
        'text/html': function(){
            Picture.queryOneBy({category, number}).then(picture => {
                res.render('pictures/show', {
                    picture: picture,
                    user: req.currentUser
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
    res.format({
        'text/html': function(){
            Picture.queryBy({category}).then(pictures => {
                res.render('pictures/index', {
                    pictures: pictures,
                    user: req.currentUser
                });
            }).catch(error => {
                console.error(error);
                next(error);
            });
        }
    });
});

module.exports = router;
