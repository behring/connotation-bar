var fs = require('fs');
var AV = require('leanengine');
var File = require('../models/file');
AV.init({
    appId: 'qhJNhVXqGVUzKMhsEmddftqd-gzGzoHsz',
    appKey: 'PSvkSKv6TkBRJFOFpG2BXM9q'
});
var resouresDir =  './scrapy_spider/resources/picture/full/';
// var resouresDir =  './scrapy_spider/resources/file/full/';
var fileNames = fs.readdirSync(resouresDir);
var index = 0;

function queryAndUploadFile(fileName) {
    var fileBuffer = fs.readFileSync(resouresDir + fileName);
    File.queryOneBy({name: fileName}).then((uploadedFile)=>{
        if(uploadedFile) {
            console.log('file   '+ uploadedFile.get('name')+ '   is exist!');
        }else {
            var uploadFile = new AV.File(fileName, fileBuffer);
            uploadFile.save().then(function(uploadedFile) {
                // 文件保存成功
                console.log(index + ': ' + uploadedFile.url());
                index++;
                queryAndUploadFile(fileNames[index]);
            }).catch(error => {
                console.error(error);
            });
        }
    });
}
queryAndUploadFile(fileNames[index]);