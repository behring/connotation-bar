/**
 * Created by behring on 2017/5/16.
 */
let Picture = require('../models/picture');
let WechatUser = require('../models/wechat-user');

const CONTENT_TYPE_PICTURE = 1;

function replayRandomPictureToUser(res, user) {
  Picture.count().then(count => {
    let category = '色系军团';
    let number = parseInt(Math.random()*count);
    Picture.queryOneBy(category, number).then(picture => {
      WechatUser.update(user,{'visitedPictureCount': user.get('visitedPictureCount') + 1});
      res.reply([
        {
          title: picture.get('category'),
          description: picture.get('title'),
          picurl: picture.get('qiniu_url')+previewThumbnail,
          url: baseUrl + '/pictures/'+category+'/'+number
        }
      ]);
    }).catch(error => console.error(error));
  }).catch(error => console.error(error));

}

function isValidText(text) {
  return parseInt(text.trim()) === CONTENT_TYPE_PICTURE;
}

function isLimitVisitPictureByUser(openId) {
  return new Promise((resolve, reject) => {
    WechatUser.findOrCreateByOpenId(openId).then(user => {
      let visitedICount = user.get('visitedPictureCount');
      resolve({isLimit: visitedPictureCount && visitedPictureCount >= 3, user: user});
    }).catch(error => reject(error));
  });
}

module.exports = {
  replayRandomPictureToUser: replayRandomPictureToUser,
  isValidText: isValidText,
  isLimitVisitPictureByUser: isLimitVisitPictureByUser
};
