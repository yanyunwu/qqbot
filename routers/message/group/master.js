const app = require('./create');
const { userInfo } = require('../../../service/select');
const { putPoint, putPower } = require('../../../service/put');

app.message('加硬币? ?', async (event, bot) => {
    try {
        let person = event.matches[0];
        let number = event.matches[1];
        let selfinfo = (await userInfo(event.group_id, person))[0];
        let remain = parseInt(selfinfo.point) + parseInt(number);
        await putPoint(selfinfo.id, String(remain));
        event.reply("添加成功");
    } catch (err) {
        event.reply("指令执行失败，请检查格式是否正确");
    }
}, { url: '加硬币', role: 'master' });

app.message('减硬币? ?', async (event, bot) => {
    try {
        console.log(event.matches);
        let person = event.matches[0];
        let number = event.matches[1];
        let selfinfo = (await userInfo(event.group_id, person))[0];
        let remain = parseInt(selfinfo.point) - parseInt(number);
        await putPoint(selfinfo.id, String(remain));
        event.reply("操作成功");
    } catch (err) {
        event.reply("指令执行失败，请检查格式是否正确");
    }
}, { url: '减硬币', role: 'master' });

app.message('设置权限? ?', async (event, bot) => {
    try {
        let person = event.matches[0];
        let power = event.matches[1];
        // if (await check('2', event, 'master')) {
        await putPower(person, power);
        event.reply("设置权限成功");
        // }
    } catch (err) {
        event.reply("指令执行失败，请检查格式是否正确");
    }
}, { url: '设置权限', role: 'master' });