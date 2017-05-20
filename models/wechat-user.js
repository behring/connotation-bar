const Base = require('./base');
const AV = require('leanengine');

class WechatUser extends Base {

  static findByOpenId(openId) {
    const query = new AV.Query(this);
    query.equalTo('openId', openId);
    return query.first();
  }

  static findOrCreateByOpenId(openId) {
    return new Promise((resolve, reject) => {
      this.findByOpenId(openId).then(user => {
        if(user) {
          resolve(user);
        }else {
          this.create({openId: openId, visitedPictureCount: 0}).then(user => {
            resolve(user);
          }).catch(error => reject(error));
        }
      }).catch(error => reject(error));
    });
  }

  static update(obj, attrs) {
    Object.keys(attrs).forEach(k => {
      obj.set(k, attrs[k])
    });
    obj.save();
  }
}

module.exports = WechatUser;
