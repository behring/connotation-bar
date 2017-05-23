'use strict';
let router = require('express').Router();

router.get('/', function(req, res, next) {
    let menu = req.query.menu;
    res.format({
        'text/html': function(){
            res.render('mine/mine', {
                menu: menu,
                user: req.currentUser
            });
        }
    });
});

module.exports = router;
