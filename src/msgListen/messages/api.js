const Listener = require('../../utils/listener');
const app = new Listener();

const { chat } = require('../../api/chat')
const random = require('../../utils/random')
const { getConfig } = require('../../sqlApi/config')

app.msg('*', (event, args) => {
    const rowMsg = event.raw_message;
    getConfig('chatProbability').then(value => {
        let p = value[0].value;
        if (random(p)) {
            chat(rowMsg).then(value => {
                let content = value.content;
                event.reply(content);
            })
        }
    })
})





module.exports = app;