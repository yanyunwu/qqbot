// 消息匹配机制
function mathchMsg(rowMsg, messageListers) {
    const allArgs = rowMsg.split(' ');
    let command = allArgs.shift();
    command = `${command}|${allArgs.length}`
    for (let msg in messageListers) {
        if (command === msg) {
            return {
                listener: messageListers[msg],
                args: allArgs
            };
        }
    }

    // 通配符设置
    const aaa = `*|${allArgs.length}`;
    if (Object.keys(messageListers).includes(aaa)) {
        return {
            listener: messageListers[aaa],
            args: allArgs
        };
    }

}


module.exports = mathchMsg;