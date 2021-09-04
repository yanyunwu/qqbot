const { readFile } = require('../utils/file');
const { userInfo } = require('../service/select');
const { putPoint } = require('../service/put');
const { masters } = require('../master.config');


module.exports = async function (url, event = { gid: 0, uid: 0 }, role) {
    for (let i of masters) {
        if (String(event.sender.user_id) === i) {
            return true;
        }
    }

    let config = await readFile('./bot.config.json');
    let cur = config[role][url];
    let pow = cur.power;
    let open = cur.open;
    let use = cur.use;
    //检测是否开启 必需
    if (!open) return false;
    //检测权限 必需
    let selfinfo = (await userInfo(event.group_id, event.sender.user_id))[0];
    if (selfinfo.power < pow) {
        event.reply('权限不足');
        return false;
    }
    //检测消耗道具 选择
    if (use) {
        let remain = parseInt(selfinfo.point) - parseInt(use);
        if (remain < 0) {
            event.reply('硬币不足');
            return false;
        }
        await putPoint(selfinfo.id, String(remain));
    }
    return true;

}