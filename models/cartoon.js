const Base = require('./base');
const AV = require('leanengine');

class Cartoon extends Base {
 static findByNumber(number) {
   const query = new AV.Query(this);
   query.equalTo('number', parseInt(number));
   return query.first();
 }
}
module.exports = Cartoon;
