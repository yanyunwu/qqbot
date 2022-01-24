const app = require('../../../bot-core').Bind();
const messageListers = require('../../msgListen/messages/group');
const mathchMsg = require('../../utils/matchMsg');
const checkUser = require('../../utils/checkUser')

// 监听群事件
app.on('message.group', (event) => {
    checkUser(event.user_id, event.group_id)
    const rowMsg = event.raw_message;
    const cb = mathchMsg(rowMsg, messageListers.listeners)
    if (cb) {
        const listener = cb.listener;
        listener.handler(event, cb.args);
    }
});


module.exports = app;