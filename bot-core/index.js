const { createClient, Client } = require('oicq');

/**
 * 封装原生oicq以防api更新
*/

class FrameBot extends Client {
    constructor(qqAcount, options) {
        super(qqAcount, options);
    }

    // 对外的接口
    static createBot(qqAcount, options) {
        return new FrameBot(qqAcount, options);
    }

    use(distributor) {
        let listeners = distributor.listeners;
        console.log(distributor);
        for (let event in listeners) {
            this.on(event, listeners[event]);
        }
    }

    static Bind() {
        return new Distributor();
    }
}

class Distributor {
    constructor() {
        this.listeners = {};
    }

    on(event, controller) {
        this.listeners[event] = controller
    }
}

module.exports = FrameBot;