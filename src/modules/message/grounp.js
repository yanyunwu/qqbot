const app = require('../../../bot-core').Bind();
const messageListers = require('../../msgListen/messages/group');


app.on('message.group', (event) => {
    console.log(1222);
    const rowMsg = event.raw_message;
    for (let msg in messageListers) {
        if (msg === rowMsg) {
            messageListers[msg](event);
        }
    }
});


module.exports = app;