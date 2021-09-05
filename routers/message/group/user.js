const app = require('./create');

const now = require('../../../utils/date');

// oicq内置模块
const { cqcode } = require("oicq");

// 数据库操作模块
const { userInfo } = require('../../../service/select');
const { putPoint, putQd } = require('../../../service/put');

app.message('查看me', async (event, bot) => {
    try {
        let info = await userInfo(event.group_id, event.sender.user_id);
        info = info[0];
        let res = `QQ:${info.uid}
等级:${info.lv}
硬币:${info.point}
权限:${info.power}`;
        let message = cqcode.at(event.sender.user_id) + '\n' + res;
        bot.sendGroupMsg(event.group_id, message);
    } catch (err) {
        console.log(err);
        event.reply("指令执行失败，请检查格式是否正确");
    }
});

app.message('查看?', async (event, bot) => {

    try {

        let uid = event.matches[0];

        if (isNaN(parseInt(uid))) {
            return;
        }

        let info = await userInfo(event.group_id, uid);
        info = info[0];
        let res = `QQ:${info.uid}
等级:${info.lv}
硬币:${info.point}
权限:${info.power}`;
        let message = cqcode.at(event.sender.user_id) + '\n' + res;
        bot.sendGroupMsg(event.group_id, message);
    } catch (err) {
        console.log(err);
        event.reply("指令执行失败，请检查格式是否正确");
    }
});

app.message('艾特? ?', async (event, bot) => {

    try {

        let uid = event.matches[0];
        let num = parseInt(event.matches[1]);

        if (isNaN(num)) {
            return;
        }
        let use = 2 * num;

        let selfinfo = (await userInfo(event.group_id, event.sender.user_id))[0];
        let remain = parseInt(selfinfo.point) - parseInt(use);
        if (remain < 0) {
            event.reply(`硬币不足，需要${2}x${num}硬币`);
            return;
        }
        await putPoint(selfinfo.id, String(remain));

        let timer = setInterval(() => {
            let message = cqcode.at(uid);
            bot.sendGroupMsg(event.group_id, message);

            num--;

            if (num <= 0) {
                clearInterval(timer);
            }

        }, 1000);


    } catch (err) {
        event.reply("指令执行失败，请检查格式是否正确");
    }
}, { url: '艾特', role: 'user' }, { use: false });



app.message('签到', async (event, bot) => {
    try {
        let selfinfo = (await userInfo(event.group_id, event.sender.user_id))[0];
        if (selfinfo.qdtime === now()) {
            event.reply("您今日已签到，请勿重复签到");
            return;
        }
        await putQd(selfinfo.id);
        let remain = parseInt(selfinfo.point) + 5;
        await putPoint(selfinfo.id, String(remain));
        event.reply('签到成功，奖励5硬币');
    } catch (err) {
        event.reply("指令执行失败，请检查格式是否正确");
    }
}, { url: '签到', role: 'user' });



app.message('对?使用 ?', async (event, bot) => {
    let person = event.matches[0];
    let good = event.matches[1];
    console.log(person);
    console.log(good);
})

