const app = require('./create');
const { userInfo } = require('../../../service/select');
const { putPoint, putPower } = require('../../../service/put');

app.message('查看邀请加群', async (event, bot) => {

    let waithand = (await bot.getSystemMsg()).data;
    console.log(waithand);

    let gidlist = []

    for (let item of waithand) {
        if (item.request_type === 'group') {
            gidlist.push({
                gname: item.group_name,
                gid: item.group_id
            })
        }
    }

    let list = '';
    for (let item of gidlist) {
        list += `群名称:${item.gname}\n`;
        list += `群号:${item.gid}\n`;
        list += `\n`;
    }

    event.reply(list);

}, { url: '查看邀请加群', role: 'master' });

app.message('同意加群?', async (event, bot) => {

    let id = event.matches[0];

    let waithand = (await bot.getSystemMsg()).data;
    console.log(waithand);

    let gidlist = []

    for (let item of waithand) {
        if (item.request_type === 'group') {
            gidlist.push({
                gname: item.group_name,
                gid: item.group_id,
                flag: item.flag
            })
        }
    }


    await bot.setGroupAddRequest(gidlist[parseInt(id) - 1].flag, true);

    event.reply('同意加群成功');

}, { url: '查看邀请加群', role: 'master' });

