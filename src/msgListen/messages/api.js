const Listener = require('../../utils/listener');
const app = new Listener();

const { chat } = require('../../api/chat')
const random = require('../../utils/random')
const config = require('../../../config')

app.msg('*', (event, args) => {
    const rowMsg = event.raw_message;
    let p = config.chatProbability
    if (random(p)) {
        chat(rowMsg).then(value => {
            let content = value.content;
            event.reply(content);
        })
    }
})





module.exports = app;