const app = require('./create');
const { userInfo } = require('../../../service/select');
const { putPoint, putPower } = require('../../../service/put');

app.message('查看邀请加群', async (event, bot) => {

    let waithand = await bot.getSystemMsg();
    event.reply(JSON.stringify(waithand));

}, { url: '查看邀请加群', role: 'master' });

