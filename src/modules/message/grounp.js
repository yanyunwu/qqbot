const app = require('../../../bot-core').Bind();

// 导入msg监听事件
const messageListers = require('../../msgListen');


// 导入工具包
const mathchMsg = require('../../utils/matchMsg');
const checkUser = require('../../utils/checkUser')
const checkPermission = require('../../utils/permission');
const bot = global.bot;

// 监听群事件
app.on('message.group', function (event) {
    let userId = event.user_id;
    let groupId = event.group_id;
    // 检测用户是否存在
    checkUser(userId, groupId)
    const rowMsg = event.raw_message;
    const cb = mathchMsg(rowMsg, messageListers.listeners)
    if (cb) {
        checkPermission(userId, groupId, cb.rowCommand).then(value => {
            if (value || cb.rowCommand === "*") {
                const listener = cb.listener;
                listener.handler(event, cb.args);
            } else {
                bot.sendGroupMsg(groupId, "您的权限不足")
            }
        })
    }
});


module.exports = app;