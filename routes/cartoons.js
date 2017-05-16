'use strict';
let router = require('express').Router();
let Cartoon = require('.././models/cartoon');

// 查询 Cartoon 列表
router.get('/', function(req, res) {
  let params = req.query;

  res.format({
    'application/json': function(){
      Cartoon.pagination(params.page, params.count).then((results)=>{
        res.json(results);
      },(error)=>{
        res.send(error);
      });
    }
  });
});

router.get('/:number', function(req, res, next) {
  let number = req.params.number;
  res.format({
    'text/html': function(){
      Cartoon.findByNumber(number).then(cartoon => {
        res.render('cartoons/show', {
          title: cartoon.get('title'),
          category: cartoon.get('category'),
          link: cartoon.get('link')
        });
      }, error => {
        console.error(error);
        next(error);
      }).catch(error => {
        console.error(error);
      });
    }
  });
});


module.exports = router;
