const app = require('./create');
// oicq内置模块
const { cqcode } = require("oicq");

//api接口
const { dog, soul, acg } = require('../../../api/娱乐');
const { weather, music } = require('../../../api/应用');

// api
app.message('舔狗日记', async (event, bot) => {
    let value = await dog();
    let data = value.data;
    event.reply(data.content);
}, { url: '舔狗日记', role: 'api' })

app.message('心灵鸡汤', async (event, bot) => {
    let value = await soul();
    let data = value.data;
    event.reply(data.content);
}, { url: '心灵鸡汤', role: 'api' })

app.message('ACG图片', async (event, bot) => {
    let value = await acg();
    console.log(value);
    let data = value.data;
    bot.sendGroupMsg(event.group_id, cqcode.image(data.url));
}, { url: 'ACG图片', role: 'api' })

app.message('天气预报 ?', async (event, bot) => {
    let loaction = event.matches[0];
    let value = await weather(loaction);
    let data = value.data;
    event.reply(JSON.stringify(data));
    event.reply("我懒得写这个接口，先这样吧");
}, { url: '天气预报', role: 'api' })

app.message('听歌 ?', async (event, bot) => {
    let keyword = event.matches[0];
    let value = await music(keyword);
    let datalist = value.data.songs;
    let data = datalist[0].id;
    bot.sendGroupMsg(event.group_id, cqcode.music('163', String(data)));
}, { url: '听歌', role: 'api' })