'use strict';
var router = require('express').Router();
let Cartoon = require('.././models/cartoon');

// 查询 Todo 列表
router.get('/', function(req, res) {
  let params = req.query;
  Cartoon.pagination(params.page, params.count).then((results)=>{
    console.log(results);
    res.json(results);
  },(error)=>{

  });
});

module.exports = router;
