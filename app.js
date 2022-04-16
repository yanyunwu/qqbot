const KoaOicq = require('.');
const Router = require('koa-oicq-message');
const config = require('./koa.oicq.config.json');

const { plp } = require('./plugins/plp')

const app = new KoaOicq();
const router = new Router();
router.command('test')
    .option('-t | --tt', '测试命令').option('-u')
    .action((ctx, next, opts) => {
        // console.log('123hhHhh哈哈哈');
        // console.log(opts);
        ctx.event.reply(JSON.stringify(opts)).catch(err => {
            console.log(err);
        })
    })
router.command('qwer')
    .action(() => {
        console.log('qwer');
    })

// app.listen(123, asda)

app.use(plp);
app.use(async (ctx, next) => {
    // ctx.event.reply(ctx.event.raw_message);
    next();
})

app.use(router.routers())



app.on('error', (err) => {
    console.log('出错了', err);
})
app.listen(2770315275);
