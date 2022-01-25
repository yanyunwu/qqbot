const app = require('../../../bot-core').Bind();
const bot = global.bot;
const config = require('../../../config');


app.on('request.friend.add', (event) => {
    // console.log(event.user_id);
    if (config.admin && config.admin.includes(String(event.user_id))) {
        bot.setFriendAddRequest(event.flag, true)
        return;
    }

    if (config.isApproveFriendAdd === 'yes') {
        bot.setFriendAddRequest(event.flag, true)
    } else if (config.isApproveFriendAdd === 'no') {
        bot.setFriendAddRequest(event.flag, false)
    }
})

app.on('request.group.invite', (event) => {
    console.log(event);
})

app.on('request.group.add', (event) => {

    if (config.admin && config.admin.includes(event.user_id)) {
        bot.setGroupAddRequest(event.flag, true)
        return;
    }

    if (config.isApproveGroupInvite === 'yes') {
        bot.setGroupAddRequest(event.flag, true)
    } else if (config.isApproveGroupInvite === 'no') {
        bot.setGroupAddRequest(event.flag, false)
    }
})






module.exports = app;