const app = require('../../../bot-core').Bind();
const { segment } = require('oicq');

app.on('notice.group.increase', (event) => {
    let message = [
        "欢迎新成员",
        segment.at(event.user_id),
        segment.face(104)
    ]
    event.group.sendMsg(message)
})

app.on('notice.group.decrease', (event) => {
    let message = [
        segment.at(event.user_id),
        "离开了，让我们欢送他",
        segment.face(104)
    ]
    event.group.sendMsg(message)
})


module.exports = app;