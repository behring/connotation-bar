/**
 * Created by behring on 2017/5/18.
 */
'use strict';
let router = require('express').Router();
let User = require('.././models/user');
let Error = require('.././models/error');

router.get('/', function(req, res) {
    res.render('sign-up/sign-up',{error:new Error()});
});

router.post('/', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    // 新建 AVUser 对象实例
    let user = new User();
    // 设置用户名
    user.setUsername(email);
    // 设置密码
    user.setPassword(password);
    // 设置邮箱
    user.setEmail(email);

    user.set('funnyCoin', 1000);

    user.signUp().then(function (loginedUser) {
        res.render('sign-in/sign-in', {error:new Error('注册成功,请到邮箱中激活账号')});
    }, function (error) {
        if (error.code === 203) {
            res.render('sign-up/sign-up',{error:new Error('此邮箱已注册',error.code)});
        } else {
            res.render('sign-up/sign-up',{error:new Error('注册失败，请重试',error.code)});
        }
    }).catch(next);

});
module.exports = router;
