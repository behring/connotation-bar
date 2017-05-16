/**
 * Created by behring on 2017/5/16.
 */
let Cartoon = require('.././models/cartoon');

const CONTENT_TYPE_CARTOON = 1;

function analyseText(text) {
  return new Promise((resolve, reject) => {
    if(parseInt(text.trim()) === CONTENT_TYPE_CARTOON) {
      Cartoon.count().then(count => {
        let number = parseInt(Math.random()*count);
        Cartoon.findByNumber(number).then(cartoon => {
          resolve(cartoon);
        }, error => {
          console.error(error);
          reject(error);
        });
      }, error => {
        console.error(error);
        reject(error);
      });
    }
  });
}

module.exports = {
  analyseText: analyseText
};
