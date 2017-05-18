var AV = require('leanengine');
let sexiJson = require('../scrapy_spider/sexi.json');
let myyfmJson = require('../scrapy_spider/myyfm.json');
let gfsdfJson = require('../scrapy_spider/gfsd.json');
let mlyzJson = require('../scrapy_spider/mlyz.json');


let resultJson = require('../data/Cartoon.json');
let File = require('../models/file');
var fs = require('fs');

AV.init({
    appId: 'qhJNhVXqGVUzKMhsEmddftqd-gzGzoHsz',
    appKey: 'PSvkSKv6TkBRJFOFpG2BXM9q'
});

var newCartoonJson = resultJson;
var index = 0;
function getFile(cartoon) {
    if(cartoon) {
        File.queryOneBy({name: cartoon.file_name}).then((file)=>{
            console.info('query finish');
            console.log(file.get('url'));
            newCartoonJson.push(Object.assign({},cartoon,{qiniu_url: file.get('url')} ));
            fs.writeFileSync('./data/Cartoon.json', JSON.stringify(newCartoonJson) , 'utf-8');
            index++;
            getFile(mlyzJson[index]);
        });
    }else {
        console.info('update finish!');
    }

}

getFile(mlyzJson[index]);

