'use strict';
var express = require('express');
var AV = require('leanengine');

//执行lean deploy部署一定要用这段
AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

//开发用这段，通过npm run development启动，修改文件自动刷新
// AV.init({
//     appId: 'qhJNhVXqGVUzKMhsEmddftqd-gzGzoHsz',
//     appKey: 'PSvkSKv6TkBRJFOFpG2BXM9q'
// });

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = require('./app');


var isDev = process.env.NODE_ENV !== 'production';
// local variables for all views
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

if (isDev) {
    // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.js');

    var compiler = webpack(webpackDevConfig);

    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {

        // public path should be the same with webpack config
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));

    // add "reload" to express, see: https://www.npmjs.com/package/reload
    var reload = require('reload');
    var http = require('http');

    var server = http.createServer(app);
    reload(server, app);
    server.listen(3000, function(){
        console.log('App (dev) is now running on port 3000!');
    });

    app.use(express.static('public'));
} else {
    app.use(express.static('public'));
    // app.use(function(req, res, next) {
    //     // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
    //     if (!res.headersSent) {
    //         var err = new Error('Not Found');
    //         err.status = 404;
    //         next(err);
    //     }
    // });

    // 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
    var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

    app.listen(PORT, function (err) {
        console.log('App (production) is now running on port:', PORT);
        console.log('Node app is running on port:', PORT);

        // 注册全局未捕获异常处理器
        process.on('uncaughtException', function(err) {
            console.error("Caught exception:", err.stack);
        });
        process.on('unhandledRejection', function(reason, p) {
            console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
        });
    });

}
