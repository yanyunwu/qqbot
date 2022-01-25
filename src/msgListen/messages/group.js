const Listener = require('../../utils/listener');
const app = new Listener();
const bot = global.bot




app.msg('开启全禁', (event) => {
    bot.setGroupWholeBan(event.group_id, true).then(_ => {
        event.reply('开启成功')
    })
})

app.msg('关闭全禁', (event) => {
    bot.setGroupWholeBan(event.group_id, false).then(_ => {
        event.reply('关闭成功')
    })
})




module.exports = app;