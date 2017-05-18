var AV = require('leanengine');
let cartoonJson = require('../scrapy_spider/crawl-data.json');
let File = require('../models/file');
var fs = require('fs');

AV.init({
    appId: 'qhJNhVXqGVUzKMhsEmddftqd-gzGzoHsz',
    appKey: 'PSvkSKv6TkBRJFOFpG2BXM9q'
});

var newCartoonJson = [];
var index = 0;
function getFile(cartoon) {
    if(cartoon) {
        File.queryOneBy({name: cartoon.file_name}).then((file)=>{
            console.info('query finish');
            console.log(file.get('url'));
            newCartoonJson.push(Object.assign({},cartoon,{qiniu_url: file.get('url')} ));
            fs.writeFileSync('./data/Cartoon.json', JSON.stringify(newCartoonJson) , 'utf-8');
            index++;
            getFile(cartoonJson[index]);
        });
    }else {
        console.info('update finish!');
    }

}

getFile(cartoonJson[index]);

