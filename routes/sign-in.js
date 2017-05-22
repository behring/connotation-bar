/**
 * Created by behring on 2017/5/18.
 */
'use strict';
let router = require('express').Router();
let User = require('.././models/user');
let Error = require('.././models/error');

router.get('/', function(req, res) {
    res.render('sign-in/sign-in',{error:new Error()});
});

router.post('/', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    User.logIn(email, password).then(function (loginedUser) {
        res.saveCurrentUser(loginedUser);
        res.redirect('/');
    }, function (error) {
        if(error.code===210) {
            res.render('sign-in/sign-in',{error:new Error('密码错误，请重试',error.code)});
        }else if(error.code===211) {
            res.render('sign-in/sign-in',{error:new Error('此邮箱尚未注册',error.code)});
        }else if(error.code===216) {
            res.render('sign-in/sign-in',{error:new Error('您的邮箱尚未激活，激活后进行登录 ',error.code)});
        }else {
            next(error);
        }
    });
});

module.exports = router;
