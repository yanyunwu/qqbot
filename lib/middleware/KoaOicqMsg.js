const { Command } = require('commander');

class MessageRouter {

    constructor() {
        this.MessageCommand = new MessageCommand();
        this.MessageCommand.Command.exitOverride();
    }

    command(...args) {
        return this.MessageCommand.command(...args);
    }

    callback() {
        let that = this;
        return async function (ctx, next) {
            let argv = ctx.event.raw_message.trim().split(/\s+/);
            try {
                let command = that.MessageCommand;
                command.parse(ctx, next, argv, { from: 'user' });
            } catch (err) {
                console.log('有错误命令');
            }
            await next();
        }
    }

    routers() {
        return this.callback();
    }


}

class MessageCommand {
    constructor(command) {
        this.Command = command || new Command();
        this.ctx = undefined;
        this.next = undefined;
    }

    command(...args) {
        return new MessageCommand(this.Command.command(...args));
    }

    option(...args) {
        this.Command.option(...args)
        return this;
    }

    action(fn) {
        this.Command.action((...args) => {
            fn(MessageCommand.ctx, MessageCommand.next, ...args)
        })
    }

    parse(ctx, next, ...args) {
        MessageCommand.ctx = ctx;
        MessageCommand.next = next
        this.Command.parse(...args)
    }

}


module.exports = MessageRouter;