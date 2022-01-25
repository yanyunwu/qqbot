const app = require('../../../bot-core').Bind();



app.on("system.online", () => console.log('机器人上线'));
app.on("system.login.qrcode", function () {
    //扫码后按回车登录
    process.stdin.once("data", () => {
        this.login()
    })
})

module.exports = app;