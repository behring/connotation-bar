'use strict';
let router = require('express').Router();
let Comic = require('../models/comic');

router.get('/', function(req, res, next) {
    let page = req.query.page || 1;
    let name = req.query.name;
    const perPage = 100;

    res.format({
        'text/html': function(){
            Comic.count({name}).then(count => {
                Comic.pagination(page, perPage ,{name}).then(comics => {
                    res.render('comics/index', {
                        comics: comics,
                        user: req.currentUser,
                        currentPage: page,
                        totalPages: Math.ceil(count/perPage)
                    });
                }).catch(error => {
                    console.error(error);
                    next(error);
                });
            });
        }
    });
});

router.get('/:number', function(req, res, next) {
    let name = req.query.name;
    let number = parseInt(req.params.number);
    let isLimited = false;
    res.format({
        'text/html': function() {
            Comic.queryOneBy({name, number}).then(comic => {
                if(req.currentUser) {
                    res.render('comics/show', {
                        comic: comic,
                        user: req.currentUser,
                        isLimited: isLimited
                    });
                } else {
                    res.render('comics/show', {
                        comic: comic,
                        user: req.currentUser,
                        isLimited: isLimited
                    });
                }

            }).catch(error => {
                console.error(error);
                next(error);
            });
        }
    });
});

module.exports = router;
