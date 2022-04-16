const { createClient } = require('oicq');
const { EventEmitter } = require('events');
const Context = require('./context');
const KoaOicqMessage = require('./middleware/KoaOicqMsg');

class Application extends EventEmitter {
    middlewareList = [];
    static MessageRouter = KoaOicqMessage;

    constructor() {
        // this.middlewareList
        super();
    }

    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware(中间件)需要传入一个函数对象');
        this.middlewareList.push(fn);
    }

    listen(...args) {
        const bot = createClient(...args);
        const callback = this.callback();
        bot.on('system.online', () => console.log('已登录'));
        bot.on("message", e => {
            const ctx = new Context(bot, e);
            // e.reply("hello world", true) //true表示引用对方的消息
            callback(ctx);
        });
        bot.on('system.login.qrcode', () => {
            process.stdin.once('data', () => {
                bot.login();
            })
        }).login();
    }

    /** 返回调用的函数对象 */
    callback() {
        const fnMiddleware = this.compose(this.middlewareList);
        const handleMessage = (ctx) => {
            fnMiddleware(ctx).then(value => {
                console.log('END');
            }).catch(err => {
                this.emit('error', err);
            })
        }

        return handleMessage;
    }

    compose(middlewareList) {
        return function (ctx) {
            // 触犯中间件的函数（递归调用）
            const dispach = index => {
                if (index >= middlewareList.length) return Promise.resolve();
                const fn = middlewareList[index];
                return Promise.resolve(
                    fn(ctx, () => dispach(index + 1))
                );
            }


            return dispach(0);
        }
    }
}

module.exports = Application;
