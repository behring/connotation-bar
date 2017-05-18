'use strict';
let router = require('express').Router();
let Cartoon = require('.././models/cartoon');

// 查询 Cartoon 列表
router.get('/', function(req, res) {
    let params = req.query;

    res.format({
        'application/json': function(){
            Cartoon.pagination(params.page, params.count).then((results)=>{
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
            Cartoon.queryOneBy({category, number}).then(cartoon => {
                res.render('cartoons/show', {
                    cartoon: cartoon
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
            Cartoon.queryBy({category}).then(cartoons => {
                res.render('cartoons/index', {
                    cartoons: cartoons
                });
            }).catch(error => {
                console.error(error);
                next(error);
            });
        }
    });
});

module.exports = router;
