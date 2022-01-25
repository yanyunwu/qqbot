// 导入自定义的核心模块
const { createBot } = require('./bot-core');
// 填写登录QQ
const bot = createBot(2770315275);
global.bot = bot;

// 导入各个模块
const messageGroup = require('./src/modules/message/grounp')
const system = require('./src/modules/system/index')
const requestFriend = require('./src/modules/request/friend')
const noticeGroup = require('./src/modules/notice/group')

// 加载各个模块
bot.use(messageGroup)
bot.use(system)
bot.use(requestFriend)
bot.use(noticeGroup)



module.exports = bot;