const frameBot = require('frame-bot');

const bot = frameBot.createBot(2770315275);
const app = require('./routers/message/group');

bot.use('message.group', app);


bot.listen(() => {
    process.stdin.once('data', (input) => {
        bot.login();
    });
});

