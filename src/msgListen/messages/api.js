const Listener = require('../../utils/listener');
const app = new Listener();

const { chat } = require('../../api/chat')
const random = require('../../utils/random')
const { getConfig } = require('../../sqlApi/config')
const config = require('../../../config').singleGroup

app.msg('*', (event, args) => {
    const rowMsg = event.raw_message;
    getConfig('chatProbability', String(event.group_id)).then(value => {
        let p = (value.length && value[0].value) || config.chatProbability;
        if (random(p)) {
            chat(rowMsg).then(value => {
                let content = value.content;
                event.reply(content);
            })
        }
    })
})





module.exports = app;