
// 创建接口模块
const frameBot = require('frame-bot');
const app = frameBot.Router()
const check = require('../../../utils/check');


// 装饰器
function decorator(fun) {
    return function (router, callback, config) {

        let call = callback;

        callback = async function (event, bot) {
            if (config) {
                if (!(await check(config.url, event, config.role))) {
                    return;
                }
            };
            call(event, bot);
        }
        fun.call(app, router, callback);
    }
}

app.message = decorator(app.message);

module.exports = app;