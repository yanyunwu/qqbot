const app = require('./create');

app.message('菜单', (event, bot) => {
    let list = `           菜单1           
主人指令  管理指令
用户指令  其他指令
娱乐功能  实用功能`;
    bot.sendGroupMsg(event.group_id, list);
});

app.message('主人指令', async (event, bot) => {
    let list = `           主人指令           
加硬币 加硬币[qq|@qq] [数量]
减硬币 减硬币[qq|@qq] [数量]`;
    bot.sendGroupMsg(event.group_id, list);
});


app.message('管理指令', async (event, bot) => {
    let list = `           管理指令           
开启全体禁言
关闭全体禁言
踢除成员 踢除[qq|@qq]`;
    bot.sendGroupMsg(event.group_id, list);
});

app.message('用户指令', async (event, bot) => {
    let list = `           用户指令        
签到   
查看 查看[qq|@qq]
查看me`;
    bot.sendGroupMsg(event.group_id, list);
});

app.message('娱乐功能', (event, bot) => {
    let list = `--娱乐功能--
舔狗日记
心灵鸡汤
ACG图片`;
    bot.sendGroupMsg(event.group_id, list);
});

app.message('实用功能', (event, bot) => {
    let list = `--实用功能--
天气预报 天气预报 [地区]
听歌 听歌 [歌名]`;
    bot.sendGroupMsg(event.group_id, list);
});