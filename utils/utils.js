/**
 * Created by behring on 2017/5/16.
 */
let Picture = require('../models/picture');
let WechatUser = require('../models/wechat-user');

const CONTENT_TYPE_PICTURE = 1;

function isLimitVisitPictureByUser(openId) {
    return new Promise((resolve, reject) => {
        WechatUser.findOrCreateByOpenId(openId).then(user => {
            let visitedPictureCount = user.get('visitedPictureCount');
            resolve({isLimit: visitedPictureCount && visitedPictureCount == wechatPerVisitedCount, user: user});
        }).catch(error => reject(error));
    });
}

function replayRandomPictureToUser(res, user) {
    let category = '色系军团';
    Picture.count({category}).then(count => {
        let number = parseInt(Math.random()*count);
        Picture.queryOneBy({category, number}).then( picture => {
            if(picture) {
                WechatUser.update(user,{'visitedPictureCount': user.get('visitedPictureCount') + 1});
                res.reply([
                    {
                        title: picture.get('category'),
                        description: picture.get('title'),
                        picurl: picture.get('original_url'),
                        url: baseUrl + '/wechat/'+category+'/'+number+'?wechatUserId=' + user.get('objectId')
                    }
                ]);
            }else {
                replayRandomPictureToUser(res, user);
            }


        }).catch(error => console.error(error));
    }).catch(error => console.error(error));

}

function isValidText(text) {
    return parseInt(text.trim()) === CONTENT_TYPE_PICTURE;
}


module.exports = {
    isLimitVisitPictureByUser: isLimitVisitPictureByUser,
    replayRandomPictureToUser: replayRandomPictureToUser,
    isValidText: isValidText
};
