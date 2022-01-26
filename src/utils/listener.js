const { setAuth } = require('../sqlApi/authority')
/**
 * 本模块是对消息监听的封装
*/
class Listener {

    constructor() {
        this.listeners = {};
    }

    msg(msg, controller) {
        const allArgs = msg.split('|');
        if (allArgs && allArgs.length) {
            let command = allArgs.shift();
            if (command !== '*') {
                this.addTODb(command)
            }

            let count = parseInt(allArgs[0]);
            count = isNaN(count) ? 0 : count;
            command = `${command}|${count}`

            this.listeners[command] = {
                handler: controller,
                argCount: isNaN(count) ? count : 0
            };
        }
    }

    addTODb(title) {
        setAuth(title);
    }

}


module.exports = Listener;