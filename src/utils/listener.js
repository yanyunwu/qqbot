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
            let count = parseInt(allArgs[0]);
            count = isNaN(count) ? 0 : count;
            command = `${command}|${count}`

            this.listeners[command] = {
                handler: controller,
                argCount: isNaN(count) ? count : 0
            };
        }
    }

}


module.exports = Listener;