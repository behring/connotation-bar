'use strict';
let router = require('express').Router();
let PaymentRecord = require('../models/payment-record');

router.get('/', function(req, res, next) {
    res.format({
        'text/html': function(){
            res.render('mine/mine', {
                user: req.currentUser,
                menu: 0
            });
        }
    });
});

router.get('/purchased', function(req, res, next) {
    res.format({
        'text/html': function(){
            PaymentRecord.queryBy({user: req.currentUser}, ['picture']).then(paymentRecords => {
                res.render('mine/mine', {
                    user: req.currentUser,
                    paymentRecords: paymentRecords,
                    menu: 1
                });
            });
        }
    });
});

module.exports = router;
