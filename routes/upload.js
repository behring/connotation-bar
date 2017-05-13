'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var Todo = AV.Object.extend('Todo');
var fs = require('fs');
var file = appRoot + '/resources/cartoons/cartoon1.jpg';

router.get('/', function(req, res, next) {
  console.log(file);

  fs.readFile(file, function (err, data) {
    if (err) {
      throw err;
    }
    var file = new AV.File('cartoon2.jpg', data);
    file.save().then(function(file) {
      // 文件保存成功
      console.log(file.url());

    });
  });
});

module.exports = router;
