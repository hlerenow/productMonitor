# productMonitor

> 线上产品可用性检测服务

#### 运行环境 
 Node.js 8+

#### 安装运行

1. 克隆或拷贝项目到本地
        git clone xxxxxxxx(本项目git地址)

        cd productMonitor

        sudo npm install

        node index.js

2. 配置邮件服务器以及检测时间间隔

    配置 ```config.json```文件,内容如下：

        {
          "smtp": {
            "host": "smtp.exmail.qq.com",//smtp地址，这里用的是腾讯的企业邮箱
            "port": 465,//端口
            "secure": true//若端口为465 则为true, 否则 false
          },
          "account": {
            "user": "xxxxx"// 邮箱帐号
            "pass": "xxxxx"//邮箱密码
          },
          "to": "xxxx",//警报邮件接收人
          "interval": 30//间隔时间 单位分钟
        }

3. 配置产品列表

    配置 ```productList.json```文件, 写入需要监测 产品名 与 产品地址, 如下：

        [{
          "name": "云景",
          "url": "http://app.yeegen.com"
        },{
          "name": "主站",
          "url": "http://www.yeegen.com"
        },{
          "name": "云感",
          "url": "http://lab.yeegen.com"
        },{
          "name": "测地王",
          "url": "http://dev.yeegen.com/king/"
        },{
          "name": "云影-试用平台",
          "url": "http://lab.yeegen.com:3000/"
        }]

    监测服务会每隔半个小时去请求每个产品服务地址， 若请求失败，会向指定邮箱发送报警邮件。

# tips
    运行前需要，在项目目录下创建一个logs文件夹