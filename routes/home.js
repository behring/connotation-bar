'use strict';
let router = require('express').Router();
let Picture = require('../models/picture');
let PaymentRecord = require('../models/payment-record');


router.get('/', function(req, res) {
    let count = defaultShowPictureCount;
    if(req.currentUser) {
        count = 18;
    }

    let responseData = {};
    Picture.pagination(1,count,{category:'色系军团'},'number').then(sexis => {
        responseData.sexis = sexis;
        Picture.pagination(1,count,{category:'搞笑动图'},'number').then(funnyGifs => {
            responseData.funnyGifs = funnyGifs;

            Picture.pagination(1,count,{category:'内涵图'},'number').then(neihans => {
                responseData.neihans = neihans;
                res.render('home/home', Object.assign({},responseData,{user: req.currentUser}));
            });

        });
    });

});

router.get('/payment', function (req, res, next) {
    let objectId = req.query.objectId;
    let userFunnyCoin = req.currentUser.get('funnyCoin');
    if(userFunnyCoin >= funnyCoinPerPicture) {
        let paymentRecord = new PaymentRecord();
        paymentRecord.set('picture', objectId);
        paymentRecord.set('targetUser', req.currentUser);
        paymentRecord.save().then((paymentRecord)=> {
            req.currentUser.set('funnyCoin',userFunnyCoin - funnyCoinPerPicture);
            req.currentUser.save().then((user) => {
                res.redirect(req.get('referer'))
            });
        }).catch((error)=>{
            console.error(error);
            next(error);
        });
    }else {
        next();
    }
});


module.exports = router;
