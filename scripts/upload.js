var fs = require('fs');
var AV = require('leanengine');
var File = require('../models/file');
AV.init({
    appId: 'qhJNhVXqGVUzKMhsEmddftqd-gzGzoHsz',
    appKey: 'PSvkSKv6TkBRJFOFpG2BXM9q'
});
// var resouresDir =  './scrapy_spider/resources/picture/full/';
var resouresDir =  './scrapy_spider/resources/file/full/';
var files = fs.readdirSync(resouresDir);

files.map((file,index) => {

    setTimeout(()=>{
        var fileBuffer = fs.readFileSync(resouresDir + file);
        File.queryOneBy({name: file}).then((uploadedFile)=>{
            if(uploadedFile) {
                console.log('file   '+ uploadedFile.get('name')+ '   is exist!');
            }else {
                var uploadFile = new AV.File(file, fileBuffer);
                uploadFile.save().then(function(uploadedFile) {
                    // 文件保存成功
                    console.log(uploadedFile.url());
                }).catch(error => {
                    console.error(error);
                });
            }

        });
    },200*index);

});