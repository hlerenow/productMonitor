'use strict';
/* 日志打印 */
var logger = require('./logger.js');

var productList = require('./productList.json');
var config = require('./config.json');

logger(`\n\n 服务启动 \n ${new Date()} \n \n `);
logger('\n 产品列表 \n',productList, '\n');

/* 邮件服务器 */
const nodemailer = require('nodemailer');
let poolConfig = {
    pool: true,
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure, // use TLS
    auth: {
        user: config.account.user,
        pass: config.account.pass
    }
};

/* 邮件发送者 */
let transporter = nodemailer.createTransport(poolConfig);

transporter.verify(function(error, success) {
   if (error) {
      logger(error);
   } else {
      logger('\n    邮件服务器已准备好');
   }
});

/* 产品服务请求检测 */
var request = require('request');

/* 检测产品是否可用 */
function checkProduct () {
  logger('\n\n\n');
  for(let i = 0; i < productList.length; i++) {
    let product = productList[i];
    request.get(product.url, function (err, res, body) {
      /* 服务出错 */
      if (err || res.statusCode !== 200) {
        console.log(JSON.stringify(err));
        logger(`${product.name} 出错 ---  ${product.url}`);
        /* 发送报警邮件 */
        var message = {
            from: 'hlere@yeegen.com',
            to: 'hlere@yeegen.com',
            subject: '产品停止服务',
            text: '产品停止服务',
            html: `<h2>${product.name} 产品停止服务</h2><p>地址：${product.url}</p><div>${JSON.stringify(err)}</div>`
        };        
        transporter.sendMail(message, function (err, success){
          if(err) {
            logger(err);
            logger(`\n    ${product.name} 警报邮件发送给失败...`);
          }
        });     
        return
      }
      logger(`\n    ${product.name} 正常 ---  ${product.url}`);
    });
  }
}

/* 定时任务 */
var schedule = require('node-schedule');
/* 每30分钟执行一次检查 */
var j = schedule.scheduleJob(`*/${config.interval} * * * *`, function(){
  logger('\n    检查时间',new Date())
  checkProduct();
});

