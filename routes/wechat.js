/**
 * Created by behring on 2017/5/15.
 */
'use strict';
let router = require('express').Router();
let wechat = require('wechat');
let config = {
  token: 'e139963fbff3a719863da6aa8284f179',
  appid: 'wx2999c48c4fdb06f8',
  encodingAESKey: 'a7i02XSEl16BA3gInr0lIZ6HUT3h0fSrkkoFhd3OB5K',
  checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

let textAnalysis = require('../utils/text-analysis');

router.use('/', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  let message = req.weixin;
  if (message.MsgType === 'event' && message.Event === 'subscribe') {
    res.reply('感谢您订阅"内涵吧"\n请回复数字选择您感兴趣的节目:\n1 内涵漫画\n2 幽默笑话\n3 脑筋急转弯\n4.在线听歌');
  }else if(message.MsgType==='text') {
    // res.reply('你账号为：' + message.FromUserName);
    textAnalysis.analyseText(message.Content).then(cartoon => {
      res.reply([
        {
          title: cartoon.get('category'),
          description: cartoon.get('title'),
          picurl: cartoon.get('link'),
          url: baseUrl + '/cartoons/' + cartoon.get('number')
        }
      ]);
    });

  }else if(message.MsgType==='image') {
    res.reply('这图....我也是醉了~~');
  }else if(message.MsgType==='voice') {
    res.reply('你普通话不够标准啊！听不太懂呢~');
  }else if(message.MsgType==='shortvideo') {
    res.reply('你这视频拍的很一般~');
  }else if(message.MsgType==='location') {
    res.reply('你附近今天空气不错哦~');
  }else if(message.MsgType==='link') {
    res.reply('这个链接我不敢打开~~~/(ㄒoㄒ)/~~');
  }



  // if (message.FromUserName === 'diaosi') {
  //   // 回复屌丝(普通回复)
  //   res.reply('hehe');
  // } else if (message.FromUserName === 'text') {
  //   //你也可以这样回复text类型的信息
  //   res.reply({
  //     content: 'text object',
  //     type: 'text'
  //   });
  // } else if (message.FromUserName === 'hehe') {
  //   // 回复一段音乐
  //   res.reply({
  //     type: "music",
  //     content: {
  //       title: "来段音乐吧",
  //       description: "一无所有",
  //       musicUrl: "http://mp3.com/xx.mp3",
  //       hqMusicUrl: "http://mp3.com/xx.mp3",
  //       thumbMediaId: "thisThumbMediaId"
  //     }
  //   });
  // } else {
  //   // 回复高富帅(图文回复)
  //   res.reply([
  //     {
  //       title: '你来我家接我吧',
  //       description: '这是女神与高富帅之间的对话',
  //       picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
  //       url: 'http://nodeapi.cloudfoundry.com/'
  //     }
  //   ]);
  // }
}));

module.exports = router;