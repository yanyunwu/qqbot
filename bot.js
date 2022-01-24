// 导入自定义的核心模块
const { createBot } = require('./bot-core');
// 填写登录QQ
const bot = createBot(2770315275);

// 导入各个模块
const messageGroup = require('./src/modules/message/grounp')
const system = require('./src/modules/system/index')

// 加载各个模块
bot.use(messageGroup)
bot.use(system)

module.exports = bot;