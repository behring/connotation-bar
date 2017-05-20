var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('resetVisitedPictureCount', function(request) {
  var query = new AV.Query('WechatUser');
  query.find().then(function (users) {
    users.forEach(function(user) {
      user.set('visitedPictureCount', 0);
    });
    return AV.Object.saveAll(users);
  }).then(function(users) {
    // 更新成功
    console.log("visitedPictureCount 更新成功");
  }, function (error) {
    // 异常处理
    console.error(error);
  });
});
