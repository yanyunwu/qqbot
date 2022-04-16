module.exports = class Context {
    event;
    bot;
    constructor(bot, event) {
        this.bot = bot;
        this.event = event;
    }

    get sender() {
        return this.event.sender;
    }

    get msg() {
        return this.event.message;
    }

    get rowMsg() {
        return this.event.raw_message;
    }

    get reply() {
        return this.event.reply.bind(this.event);
    }
}