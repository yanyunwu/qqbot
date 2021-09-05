const { readFile } = require('../utils/file');
const { userInfo } = require('../service/select');
const { putPoint } = require('../service/put');
const { masters } = require('../master.config');


module.exports = async function (event, navigation, openlist = { power: true, use: true }) {
    if (openlist.power === undefined) openlist.power = true;
    if (openlist.use === undefined) openlist.use = true;

    // 检测主人
    for (let i of masters) {
        if (String(event.sender.user_id) === i) {
            return true;
        }
    }

    // 先检测是否配置检测
    if (!navigation.role) return true;
    if (!navigation.url) return true;

    let config = await readFile('./bot.config.json');
    let cur = config[navigation.role][navigation.url];
    let open = cur.open
    let pow = cur.power;
    let use = cur.use;

    // 检测是否开启
    if (!open) return false;

    // 获取用户信息
    let selfinfo = (await userInfo(event.group_id, event.sender.user_id))[0];

    // 是否检测权限
    if (openlist.power) {

        if (open) {
            if (selfinfo.power < pow) {
                event.reply(`权限不足，需要权限${pow}`);
                return false;
            }
        }

    }

    // 是否检测消耗
    if (openlist.use) {

        if (use) {
            let remain = parseInt(selfinfo.point) - parseInt(use);
            if (remain < 0) {
                event.reply(`硬币不足，需要${use}硬币`);
                return false;
            }
            await putPoint(selfinfo.id, String(remain));
        }

    }

    return true;

}