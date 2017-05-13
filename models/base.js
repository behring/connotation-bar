/**
 * Created by behring on 2017/5/12.
 */
const AV = require('leanengine');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Base extends AV.Object {
  static create(attrs) {
    const obj = new this();
    Object.keys(attrs).forEach(k => {
      if (k.endsWith("Id")){
        const objClassName = k.replace(/Id$/, '');
        obj.set(objClassName, AV.Object.createWithoutData(capitalizeFirstLetter(objClassName), attrs[k]))
      } else {
        obj.set(k, attrs[k])
      }
    });
    return obj.save();
  }

  static queryBy(attrs) {
    const query = new AV.Query(this);

    Object.keys(attrs).forEach(k => {
      if (k.endsWith("Id")){
        const objClassName = k.replace(/Id$/, '');
        query.equalTo(objClassName, AV.Object.createWithoutData(capitalizeFirstLetter(objClassName), attrs[k]));
      } else {
        query.equalTo(k, attrs[k])
      }
    });

    return query.find();
  }

  static find(id) {
    const query = new AV.Query(this);
    return query.get(id);
  }
}

module.exports = Base;