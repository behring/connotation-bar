'use strict';
var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AV = require('leanengine');
var morgan = require('morgan');
global.appRoot = path.resolve(__dirname);
global.baseUrl = 'http://neihanba.leanapp.cn';
global.previewThumbnail = '?imageMogr2/thumbnail/400/crop/400x300';
global.previewFirstFrame = '?vframe/jpg/offset/0/w/400/h/300';

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

var app = express();

app.use(morgan('combined'));
// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//需要此中间件才能获取req.currentUser  https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html#废弃_currentUser
app.use(AV.Cloud.CookieSession({ secret: '92383dc3f56968cd747e89659c8909956f2836ccb8b941c45016d466c4d563802e9aea0073f139eef75abc99f4a63eb0d86e302a71875c56005e77f9b6bbf6ab', maxAge: 3600000, fetchUser: true }));

// 设置默认超时时间
app.use(timeout('15s'));

// 加载云引擎中间件
app.use(AV.express());

app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 可以将一类的路由单独保存在一个文件中
app.use('/', require('./routes/home'));
app.use('/sign-in', require('./routes/sign-in'));
app.use('/sign-up', require('./routes/sign-up'));
app.use('/sign-out', require('./routes/sign-out'));
app.use('/pictures', require('./routes/pictures'));
app.use('/mine', require('./routes/mine'));
app.use('/wechat', require('./routes/wechat'));
app.use('/todos', require('./routes/todos'));

// error handlers
app.use(function(err, req, res, next) {
    if (req.timedout && req.headers.upgrade === 'websocket') {
        // 忽略 websocket 的超时
        return;
    }

    var statusCode = err.status || 500;
    if (statusCode === 500) {
        console.error(err.stack || err);
    }
    if (req.timedout) {
        console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
    }
    res.status(statusCode);
    // 默认不输出异常详情
    var error = {};
    if (app.get('env') === 'development') {
        // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
        error = err;
    }
    res.render('error', {
        message: err.message,
        error: error
    });
});

module.exports = app;
