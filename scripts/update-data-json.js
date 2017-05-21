var AV = require('leanengine');
let sexiJson = require('../scrapy_spider/sexi.json');
let myyfmJson = require('../scrapy_spider/myyfm.json');
let gfsdfJson = require('../scrapy_spider/gfsd.json');
let mlyzJson = require('../scrapy_spider/mlyz.json');
let sexiaozuJson = require('../scrapy_spider/sexiaozu.json');
let funnyGifJson = require('../scrapy_spider/funny-gif.json');
let evilGifJson = require('../scrapy_spider/evil-gif.json');

let resultJson = require('../data/Picture.json');
let File = require('../models/file');
var fs = require('fs');

AV.init({
    appId: 'qhJNhVXqGVUzKMhsEmddftqd-gzGzoHsz',
    appKey: 'PSvkSKv6TkBRJFOFpG2BXM9q'
});

var newPictureJson = resultJson;
var index = 0;
function getFile(picture) {
    if(picture) {
        File.queryOneBy({name: picture.file_name}).then((file)=>{
            console.log(index + ': query finish! ' + file.get('url'));
            newPictureJson.push(Object.assign({},picture,{qiniu_url: file.get('url')} ));
            fs.writeFileSync('./data/Picture.json', JSON.stringify(newPictureJson) , 'utf-8');
            index++;
            getFile(evilGifJson[index]);
        });
    }else {
        console.info('update finish!');
    }

}

getFile(evilGifJson[index]);

