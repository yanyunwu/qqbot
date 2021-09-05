const app = require('./create');

app.message('开启全体禁言', async (event, bot) => {
    bot.setGroupWholeBan(event.group_id, true);
    event.reply('已开启群禁言');
}, { url: '开启全体禁言', role: 'admin' });

app.message('关闭全体禁言', async (event, bot) => {
    bot.setGroupWholeBan(event.group_id, false);
    event.reply('已关闭群禁言');
}, { url: '关闭全体禁言', role: 'admin' });

app.message('踢除?', async (event, bot) => {
    try {
        let match = event.matches[0];
        bot.setGroupKick(event.group_id, match).then(value => {
            if (value.retcode === 0) {
                event.reply(`踢除成员${match}成功`);
            } else {
                event.reply('踢除失败，请检查格式');
            }
        });
    } catch (err) {
        console.log(err);
        event.reply("指令执行失败，请检查格式是否正确");
    }
}, { url: '踢除成员', role: 'admin' });

app.message('禁言? ?', async (event, bot) => {
    try {
        let person = event.matches[0];
        let time = event.matches[1];
        await bot.setGroupBan(event.group_id, person, parseInt(time) * 60);
    } catch (err) {
        event.reply("指令执行失败，请检查格式是否正确");
    }
}, { url: '禁言成员', role: 'admin' });

app.message('解除禁言?', async (event, bot) => {
    try {
        let person = event.matches[0];
        await bot.setGroupBan(event.group_id, person, 0);
    } catch (err) {
        event.reply("指令执行失败，请检查格式是否正确");
    }
}, { url: '禁言成员', role: 'admin' });