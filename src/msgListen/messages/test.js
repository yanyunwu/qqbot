const Listener = require('../../utils/listener');
const app = new Listener();
const { doHello } = require('../controllers/group')


app.msg('hello', doHello)
app.msg('打印|1', (event, args) => {
    let log = args[0];
    event.reply(log);
})
app.msg('打印|2', (event, args) => {
    event.reply(args.join(','))
})



module.exports = app;